const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const tokenService = require('../token/token-service')

module.exports = () => {

  passport.use(new BearerStrategy((token, done) => {
    tokenService.findTokenUser(token)
      .subscribe(
        data => {
          if(data && data.enabled && !data.isExpired() && data.user) {
            data.user.token = data.accessToken
            done(null, data.user)
          } else {
            done(null, false)
          }
        },
        err => done(err))
  }))

  /**
   * Set route scope.
   * Available values:
   * 1. admin
   * 2. user
   * 3. *
   */
  passport.scope = scope => {
    return (req, res, next) => {
      if (req.user == null) {
        return res.sendStatus(403)
      }

      if (scope == null || scope === '*') {
        return next()
      }

      let inArray = Array.isArray(scope) && scope.includes(req.user.scope)
      let isMatch = scope === req.user.scope

      inArray || isMatch ? next() : res.sendStatus(403)
    }
  }
}
