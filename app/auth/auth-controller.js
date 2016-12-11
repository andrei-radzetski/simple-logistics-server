const Observable = require('rx').Observable
const RestUtil = require('../rest/rest-util')
const userService = require('../user/user-service')
const tokenService = require('../token/token-service')

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

    // TODO: params validation

    let login = req.body.username
    let password = req.body.password
    let remember = req.body.remember

    userService.findByLogin(login)
      .flatMap(user => ths._checkUser(user, password))
      .flatMap(user => tokenService.create(user, remember))
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
        err => res.sendStatus(500))
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

let instance = new AuthController()
module.exports = instance
