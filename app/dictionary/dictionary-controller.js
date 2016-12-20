const AbstractController = require('../rest').AbstractController
const dictionaryService = require('./dictionary-service')
const Dictionary = require('./dictionary')
const RestUtil = require('../rest/rest-util')

class DictionaryController extends AbstractController {

  constructor () {
    super(dictionaryService)
  }

  /**
   * Get list of types of dictionaries.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  types(req, res, next) {
    let ths = this

    this.service.getTypes()
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

  /**
   * Get list of languages.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  languages(req, res, next) {
    let ths = this

    this.service.find({ type: Dictionary.LANGUAGE })
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

  /**
   * Get list of countries.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  countries(req, res, next) {
    let ths = this

    this.service.find({ type: Dictionary.COUNTRY })
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

  /**
   * Get list of kinds of request.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  requestKinds(req, res, next) {
    let ths = this

    this.service.find({ type: Dictionary.REQUEST_KIND })
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

  /**
   * Get list of request services.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  requestServices(req, res, next) {
    let ths = this

    this.service.find({ type: Dictionary.REQUEST_SERVICE })
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

  /**
   * Get list of transports.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  trasports(req, res, next) {
    let ths = this

    this.service.find({ type: Dictionary.TRANSPORT })
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

  /**
   * Get list of objects by params.
   *
   * @param {Object} params
   * @returns {Observable<Array<Object>>}
   */
  find(params) {
    let options = {}
    let source = Rx.Observable.fromNodeCallback(this.clazz.find, this.clazz)
    return source(params, options)
  }

}

module.exports = new DictionaryController()