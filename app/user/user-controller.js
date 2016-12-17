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

  /**
   * Update data of current user.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  updateProfile (req, res, next) {
    let self = this;

    new ParamsValidator([
      { name: 'firstName', value: req.body.firstName, type: ParamValidator.STRING, required: true },
      { name: 'secondName', value: req.body.secondName, type: ParamValidator.STRING, required: true },
      { name: 'email', value: req.body.email, type: ParamValidator.EMAIL, required: true },
      { name: 'phone', value: req.body.phone, type: ParamValidator.PHONE, required: true },
      { name: 'country', value: req.body.country, type: ParamValidator.STRING },
      { name: 'city', value: req.body.city, type: ParamValidator.STRING },
      { name: 'language', value: req.body.language, type: ParamValidator.STRING },
      { name: 'additionalInfo', value: req.body.additionalInfo, type: ParamValidator.STRING },
    ]).validate()
      .flatMap(params => self.service.update(req.user._id, params))
      .subscribe(
        data => res.json(self.createResponseBoby(data)),
        err => next(err))
  }

  /**
   * Create user.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  createProfile (req, res, next) {
    res.json(this.createResponseBoby(null, false))
  }

}

module.exports = new UserController()
