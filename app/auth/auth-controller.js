const Observable = require('rx').Observable
const RestUtil = require('../rest/rest-util')
const userService = require('../user/user-service')
const tokenService = require('../token/token-service')
const ParamsValidator = require('../validation/params-validator')
const ParamValidator = require('../validation/param-validator')
const HttpError401 = require('../rest/error/http-error-401')

class AuthController {

  /**
   * Login.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  login (req, res, next) {
    let ths = this
    let params = {}

    new ParamsValidator([
      { name: 'login', value: req.body.username, type: ParamValidator.STRING, required: true },
      { name: 'password', value: req.body.password, type: ParamValidator.STRING, required: true },
      { name: 'remember', value: req.body.remember, type: ParamValidator.BOOLEAN }
    ]).validate()
      .flatMap(result => {
        params = result
        return userService.findByLogin(params.login)
      })
      .flatMap(user => ths._checkUser(user, params.password))
      .flatMap(user => tokenService.create(user, params.remember))
      .flatMap(token => RestUtil.dataToResponse(token))
      .subscribe(
      token => res.json(RestUtil.createResponseBoby(token, false)),
      err => next(err))
  }

  /**
   * Logout.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  logout (req, res, next) {
    tokenService.disable(req.user.token)
      .subscribe(
      token => res.json(RestUtil.createResponseBoby(null, false)),
      err => next(err))
  }

  /**
   *
   */
  _checkUser (user, password) {
    if (!user) {
      return Observable.throw(new HttpError401('User not found.'))
    }

    return user.comparePassword(password)
      .flatMap(isMatch => isMatch
        ? Observable.return(user)
        : Observable.throw(new HttpError401('Incorrect password.')))
  }

}

module.exports = new AuthController()
