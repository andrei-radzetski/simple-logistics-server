const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const userService = require('../user').service

/**
 * If the credentials are valid, the verify callback
 * invokes "done" to supply Passport with the user
 * that authenticated.
 *
 * @callback done
 * @param {Object} err
 * @param {Object} user
 * @param {Object} [message]
 *
 * Credentials checking.
 *
 * @param {string} username
 * @param {string} password
 * @param {done} done
 */
function checkCredential (username, password, done) {
  userService.findByLogin(username)
        .then((user) => {
          if (user.comparePasswords(password)) {
            done(null, user)
          } else {
            done(null, false, { message: 'Incorrect password.' })
          }
        })
        .catch(() =>
            done(null, false, { message: 'User not found.' }))
}

/**
 * Middleware.
 *
 * Check user already authenticated.
 */
function authenticationMiddleware () {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }

    res.sendStatus(401)
  }
}

/**
 * Serialize user instances to and from the session.
 *
 * @callback done
 * @param {User} user
 */
function serializeUser (user, done) {
  done(null, user._id)
}

/**
 * Deserialize user instances to and from the session.
 *
 * @callback done
 * @param {string} id
 */
function deserializeUser (id, done) {
  userService.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err, null))
}

module.exports = () => {
  passport.serializeUser(serializeUser)
  passport.deserializeUser(deserializeUser)
  passport.use(new LocalStrategy(checkCredential))
  passport.protect = authenticationMiddleware
}

