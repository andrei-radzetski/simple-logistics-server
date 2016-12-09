const AbstractController = require('../rest').AbstractController
const userService = require('./user-service')

class UserController extends AbstractController {

  constructor () {
    super(userService)
  }

}

let instance = new UserController()
module.exports = instance
