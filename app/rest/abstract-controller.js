const RestUtil = require('../rest/rest-util')
const ParamsValidator = require('../validation/params-validator')
const ParamValidator = require('../validation/param-validator')
const logger = require('../logger')(module)

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
   * Find object by id.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   */
  findById (req, res, next) {
    if (typeof this.service.findById !== 'function') {
      throw new TypeError('Service doesn\'t have "findById" method.')
    }

    let ths = this

    new ParamsValidator([
      { name: 'id', value: req.params.id, type: ParamValidator.OBJECT_ID, required: true },
    ]).validate()
      .flatMap(result => ths.service.findById(result.id))
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
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

    // TODO: Unchecked url params
    logger.warn('Unchecked url params')
    let ths = this

    ths.service.find({})
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
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
    
    // TODO: Unchecked req.body
    logger.warn('Unchecked req.body')
    let ths = this

    new ParamsValidator([
      { name: 'id', value: req.params.id, type: ParamValidator.OBJECT_ID, required: true },
    ]).validate()
      .flatMap(result => ths.service.update(result.id, req.body))
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }
}

module.exports = AbstractController
