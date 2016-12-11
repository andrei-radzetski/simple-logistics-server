const AbstractController = require('../rest').AbstractController
const userService = require('./user-service')

class UserController extends AbstractController {

  constructor () {
    super(userService)
  }

  /**
   * Get data of current user.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  profile(req, res, next) {
    res.json(this.createResponseBoby(req.user.toResponse(true), false));
  }

}

let instance = new UserController()
module.exports = instance
