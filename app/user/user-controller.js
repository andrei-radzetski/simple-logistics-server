const AbstractController = require('../rest').AbstractController
const userService = require('./user-service')
const ParamsValidator = require('../validation/params-validator')
const ParamValidator = require('../validation/param-validator')

class UserController extends AbstractController {

  constructor () {
    super(userService)
  }

  /**
   * @returns {Observable<Object>}
   */
  validateCreateParams(params) {
    return new ParamsValidator([
      { name: 'email', value: params.email, type: ParamValidator.EMAIL, required: true },
      { name: 'phone', value: params.phone, type: ParamValidator.PHONE, required: true },
      { name: 'password', value: params.password, type: ParamValidator.STRING, required: true },
      { name: 'firstName', value: params.firstName, type: ParamValidator.STRING, required: true },
      { name: 'secondName', value: params.secondName, type: ParamValidator.STRING, required: true },
    ]).validate()
  }

  /**
   * Get data of current user.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  profile (req, res, next) {
    res.json(this.createResponseBoby(req.user.toResponse(true), false))
  }

}

module.exports = new UserController()
