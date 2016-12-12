const Observable = require('rx').Observable
const RestUtil = require('../rest/rest-util')
const userService = require('../user/user-service')
const tokenService = require('../token/token-service')
const logger = require('../logger')(module)
const ParamsValidator = require('../validation/params-validator')
const ParamValidator = require('../validation/param-validator')

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
      err => res.status(401).send(err ? err.message : null))
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
      token => res.sendStatus(401),
      err => {
        logger.error(err)
        res.sendStatus(500)
      })
  }

  /**
   *
   */
  _checkUser (user, password) {
    if (!user) {
      return Observable.throw({ message: 'User not found.' })
    }

    return user.comparePassword(password)
      .flatMapObserver(
      isMatch => isMatch ? Observable.return(user) : Observable.throw({ message: 'Incorrect password.' }),
      err => Observable.throw(err),
      () => Observable.empty())
  }

}

module.exports = new AuthController()
