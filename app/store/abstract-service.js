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
    return Rx.Observable.fromNodeCallback(this.clazz.findById, this.clazz)(id)
  }

  /**
   * Get list of objects by params.
   *
   * @param {Object} params
   * @returns {Observable<Array<Object>>}
   */
  find (params) {
    return Rx.Observable.fromNodeCallback(this.clazz.find, this.clazz)(params)
  }

  /**
   * Create new object.
   *
   * @param {Object} data
   * @returns {Observable<Object>}
   */
  create (data) {
    return Rx.Observable.fromNodeCallback(this.clazz.create, this.clazz)(data)
  }

  /**
   * Update object by id.
   *
   * @param {Object} data
   * @returns {Observable<Object>}
   */
  update (id, data) {
    return Rx.Observable.fromNodeCallback(this.clazz.findByIdAndUpdate, this.clazz)(id, data, { new: true })
  }
}

module.exports = AbstractService
