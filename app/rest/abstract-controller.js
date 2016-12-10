const Rx = require('rx')

/**
 * @abstract
 */
class AbstractController {

  /**
   * @param {AbstractService} service
   */
  constructor (service) {
    if (new.target === AbstractController) {
      throw new TypeError('Cannot construct abstract instances directly.')
    }

    if (service == null) {
      throw new TypeError('Service must be defined.')
    }

    this.service = service
  }

  /**
   * Create response.
   *
   * @param {Object} response - data for the response.
   * @param {Error} error
   * @param {string} message - error message
   * @returns {Object}
   */
  createResponseBoby (response, error, message) {
    return error ? { response: null, error: true, message: message }
      : { response: response, error: false, message: null }
  }

  /**
   * Call service method and process response.
   *
   * @param {Object} context - calling method context.
   * @param {function} fn - calling method.
   * @param {res} res - server response object.
   * @param {Array<Object>} params - arguments of the calling method.
   * @private
   */
  _applySubscribe (context, fn, res, params) {
    fn.apply(context, params)
      .flatMapObserver(
        data => {
          return Array.isArray(data)
            ? Rx.Observable.from(data).map(el => el.toResponse()).toArray()
            : Rx.Observable.return(data ? data.toResponse() : null)
        },
        err => Rx.Observable.throw(err),
        () => Rx.Observable.empty())
      .subscribe(
        data => res.json(this.createResponseBoby(data)),
        err => res.json(this.createResponseBoby(null, err, err.message)))
  }

  /**
   * Find object by id.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  findById (req, res, next) {
    if (typeof this.service.findById !== 'function') {
      throw new TypeError('Service doesn\'t have "findById" method.')
    }

    let data = req.params.id

    this._applySubscribe(this.service, this.service.findById, res, [data])
  }

  /**
   * Get list of all objects.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  find (req, res, next) {
    if (typeof this.service.find !== 'function') {
      throw new TypeError('Service doesn\'t have "find" method.')
    }

    this._applySubscribe(this.service, this.service.find, res, [])
  }
}

module.exports = AbstractController
