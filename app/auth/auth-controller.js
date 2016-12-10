const passport = require('passport')

class AuthController {

  /**
   * Login.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  login (req, res, next) {
    passport.authenticate('local', (err, user, message) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.status(401).send(message ? message.message : null)
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        return res.sendStatus(200)
      })
    })(req, res, next)
  }

  /**
   * Logout.
   *
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  logout (req, res, next) {
    req.logout()
    res.sendStatus(401)
  }
}

let instance = new AuthController()
module.exports = instance
