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
   * @returns {Object}
   */
  findById (id) {
    return Rx.Observable.fromNodeCallback(this.clazz.findById, this.clazz)(id)
  }

  /**
   * Get list of all objects.
   *
   * @returns {Array<Object>}
   */
  find () {
    return Rx.Observable.fromNodeCallback(this.clazz.find, this.clazz)({})
  }
}

module.exports = AbstractService
