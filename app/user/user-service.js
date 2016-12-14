const AbstractService = require('../store').AbstractService
const User = require('./user')
const Rx = require('rx')

class UserService extends AbstractService {

  constructor () {
    super(User)
  }

  /**
   * @returns {Observable<Object>}
   */
  createNewInstance(data) {
    return Rx.Observable.return(new User(data));
  }

  findByLogin (login) {
    let condition = { $or: [{ email: login }, { phone: login }] }
    let source = Rx.Observable.fromNodeCallback(User.findOne, User)
    return source(condition)
  }

}

module.exports = new UserService()
