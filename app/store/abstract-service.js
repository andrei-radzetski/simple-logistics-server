const Rx = require('rx')

/**
 * @abstract
 */
class AbstractService {

  /**
   * @param {Object} clazz - model class
   */
  constructor (clazz) {
    if (new.target === AbstractService) {
      throw new TypeError('Cannot construct abstract instances directly.')
    }

    if (!clazz) {
      throw new TypeError('Model class is undefined.')
    }

    this.clazz = clazz
  }

  /**
   * Get object by id.
   *
   * @param {string|ObjectId} id - the identifier of the desired object.
   * @returns {Observable<Object>}
   */
  findById (id) {
    let options = {}
    let source = Rx.Observable.fromNodeCallback(this.clazz.findById, this.clazz)
    return source(id, options)
  }

  /**
   * Get list of objects by params.
   *
   * @param {Object} params
   * @returns {Observable<Array<Object>>}
   */
  find (params) {
    let options = {}
    let source = Rx.Observable.fromNodeCallback(this.clazz.find, this.clazz)
    return source(params, options)
  }

  /**
   * Create new object.
   *
   * @param {Object} data
   * @returns {Observable<Object>}
   */
  create (data) {
    let options = {}
    let source = Rx.Observable.fromNodeCallback(this.clazz.create, this.clazz)
    return source(data, options)
  }

  /**
   * Update object by id.
   *
   * @param {Object} data
   * @returns {Observable<Object>}
   */
  update (id, data) {
    let options = { new: true }
    let source = Rx.Observable.fromNodeCallback(this.clazz.findByIdAndUpdate, this.clazz)
    return source(id, data, options)
  }
}

module.exports = AbstractService
