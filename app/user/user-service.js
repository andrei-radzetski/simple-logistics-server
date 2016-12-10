const AbstractService = require('../store').AbstractService
const User = require('./user')
const Rx = require('rx')

class UserService extends AbstractService {

  constructor () {
    super(User)
  }

  findByLogin (login) {
    return Rx.Observable
      .fromNodeCallback(User.findOne, User)({ $or: [{ email: login }, { phone: login }] })
  }

}

let instance = new UserService()
module.exports = instance
