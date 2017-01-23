const Rx = require('rx')

/**
 * @abstract
 */
class AbstractService {

  /**
   * @param {Object} clazz - model class
   */
  constructor(clazz) {
    if (new.target === AbstractService) {
      throw new TypeError('Cannot construct abstract instances directly.')
    }

    if (!clazz) {
      throw new TypeError('Model class is undefined.')
    }

    this.clazz = clazz
  }

  /**
   * @abstract
   * @returns {Observable<Object>}
   */
  createNewInstance(params) {
    throw new TypeError('"createNewInstance" must be overridden.')
  }

  _createSaveObservable(model, options) {
    return Rx.Observable.create(observer => {
      model.save(options, (err, model) => {
        if (err) { return observer.onError(err) }
        observer.onNext(model)
        observer.onCompleted()
      })
    })
  }

  /**
   * Get object by id.
   *
   * @param {string|ObjectId} id - the identifier of the desired object.
   * @returns {Observable<Object>}
   */
  findById(id) {
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
  find(params, projection, options) {
    let source = Rx.Observable.fromNodeCallback(this.clazz.find, this.clazz)
    return source(params, projection, options)
  }

  /**
   * Create new object.
   *
   * @param {Object} data
   * @returns {Observable<Object>}
   */
  create(data) {
    let ths = this
    let options = {}

    return this.createNewInstance(data)
      .flatMap(model => ths._createSaveObservable(model, options))
  }

  /**
   * Update object by id.
   *
   * @param {Object} data
   * @returns {Observable<Object>}
   */
  update(id, data) {
    let options = { new: true }
    let source = Rx.Observable.fromNodeCallback(this.clazz.findByIdAndUpdate, this.clazz)
    return source(id, data, options)
  }

  /**
   * Remove object by id.
   *
   * @param {String} id
   * @returns {Observable<Object>}
   */
  remove(id) {
    let source = Rx.Observable.fromNodeCallback(this.clazz.findByIdAndRemove, this.clazz)
    return source(id)
  }
}

module.exports = AbstractService
