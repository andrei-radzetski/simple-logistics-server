const passport = require('passport')

/**
 *
 */
function login (req, res, next) {
  passport.authenticate('local', (err, user, message) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res
                .status(401)
                .send(message ? message.message : null)
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
 *
 */
function logout (req, res, next) {
  req.logout()
  res.sendStatus(401)
}

module.exports = {
  login: login,
  logout: logout
}
