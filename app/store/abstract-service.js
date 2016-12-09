const Rx = require('rx')

/**
 * @abstract
 */
class AbstractService {

  constructor () {
    if (new.target === AbstractService) {
      throw new TypeError('Cannot construct abstract instances directly.')
    }
  }

  findById (id) {
    return Rx.Observable.create(observer => {
      observer.onNext(id)
      observer.onCompleted()
    })
  }

  find () {
    return Rx.Observable.create(observer => {
      observer.onNext([])
      observer.onCompleted()
    })
  }
}

module.exports = AbstractService
