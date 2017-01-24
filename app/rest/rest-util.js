const Rx = require('rx')

class RestUtil {

  /**
   * Create response.
   *
   * @param {Object} response - data for the response.
   * @param {Error} error
   * @param {string} message - error message
   * @param {nubmber} code - internal error code
   * @returns {Object}
   */
  static createResponseBoby (response, error, message, code) {
    return error 
      ? { response: null, error: true, message: message, internalCode: code }
      : { response: response, error: false }
  }

  static addCountToBody(response, count) {
    response.count = count
    return response
  }

  /**
   * Create error response.
   *
   * @param {string} message - error message.
   * @param {nubmber} code - internal error code.
   * @returns {Object}
   */
  static createErrorResBoby (message, code) {
    return RestUtil.createResponseBoby(null, true, message, code)
  }

  /**
   * Create response from error.
   *
   * @param {Error} error - error.
   * @returns {Object}
   */
  static createResBobyFromError (error) {
    return RestUtil.createErrorResBoby(error.message, error.code)
  }

  /**
   * Convert object or list of objects to response.
   * Object have to have "toResponse" method.
   *
   * @param {Object|Array<Object>} data
   *
   * @returns {Observable<Object>|Observable<Array<Object>>}
   */
  static dataToResponse (data) {
    return Array.isArray(data)
            ? Rx.Observable.from(data).map(el => el.toResponse()).toArray()
            : Rx.Observable.return(data ? data.toResponse() : null)
  }

}

module.exports = RestUtil
