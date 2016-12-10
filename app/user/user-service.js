const AbstractService = require('../store').AbstractService
const User = require('./user')
const Rx = require('rx')

class UserService extends AbstractService {

  constructor () {
    super(User)
  }

  findByLogin (login) {
    return Rx.Observable.create(observer => {
      observer.onNext(login)
      observer.onCompleted()
    })
  }

}

let instance = new UserService()
module.exports = instance
