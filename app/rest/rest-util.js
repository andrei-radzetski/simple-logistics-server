const Rx = require('rx')

class RestUtil {

  /**
   * Create response.
   *
   * @param {Object} response - data for the response.
   * @param {Error} error
   * @param {string} message - error message
   * @returns {Object}
   */
  static createResponseBoby (response, error, message) {
    return error ? { response: null, error: true, message: message }
      : { response: response, error: false, message: null }
  }

  /**
   * Call service method and process response.
   *
   * @param {Object} context - calling method context.
   * @param {function} method - calling method.
   * @param {res} res - server response object.
   * @param {Array<Object>} params - arguments of the calling method.
   */
  static callServiceMethod (context, method, res, params) {
    method.apply(context, params)
      .flatMapObserver(
        data => RestUtil.dataToResponse(data),
        err => Rx.Observable.throw(err),
        () => Rx.Observable.empty())
      .subscribe(
        data => res.json(RestUtil.createResponseBoby(data)),
        err => res.json(RestUtil.createResponseBoby(null, err, err.message)))
  }

  /**
   * Convert object or list of objects to response.
   * Object have to have "toResponse" method.
   *
   * @param {Object|Array<Object>} data
   * @returns {Observable<Object>|Observable<Array<Object>>}
   */
  static dataToResponse (data) {
    return Array.isArray(data)
            ? Rx.Observable.from(data).map(el => el.toResponse()).toArray()
            : Rx.Observable.return(data ? data.toResponse() : null)
  }

}

module.exports = RestUtil
