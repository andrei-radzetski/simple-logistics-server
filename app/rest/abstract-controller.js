const RestUtil = require('../rest/rest-util')

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
    return RestUtil.createResponseBoby(response, error, message)
  }

  /**
   * Call service method and process response.
   *
   * @param {Object} context - calling method context.
   * @param {function} method - calling method.
   * @param {res} res - server response object.
   * @param {Array<Object>} params - arguments of the calling method.
   * @private
   */
  callServiceMethod (context, method, res, params) {
    RestUtil.callServiceMethod(context, method, res, params)
  }

  /**
   * Find object by id.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   */
  findById (req, res, next) {
    if (typeof this.service.findById !== 'function') {
      throw new TypeError('Service doesn\'t have "findById" method.')
    }

    let id = req.params.id

    this.callServiceMethod(this.service, this.service.findById, res, [id])
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

    this.callServiceMethod(this.service, this.service.find, res, [{}])
  }

  /**
   * Update object by id.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  update (req, res, next) {
    if (typeof this.service.update !== 'function') {
      throw new TypeError('Service doesn\'t have "update" method.')
    }

    let id = req.params.id
    let data = req.body

    this.callServiceMethod(this.service, this.service.update, res, [id, data])
  }
}

module.exports = AbstractController
