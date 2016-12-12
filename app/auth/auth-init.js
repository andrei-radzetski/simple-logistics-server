const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const tokenService = require('../token/token-service')
const HttpError401 = require('../rest/error/http-error-401')
const HttpError403 = require('../rest/error/http-error-403')

module.exports = () => {
  passport.use(new BearerStrategy((token, next) => {
    tokenService.findTokenUser(token)
      .subscribe(data => {
          if (data && data.enabled && !data.isExpired() && data.user) {
            data.user.token = data.accessToken
            next(null, data.user)
          } else {
            next(new HttpError401(), false)
          }
        }, err => next(err))
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
      if (req.user == null || scope == null) {
        return next(new HttpError403())
      }

      let inArray = Array.isArray(scope) && scope.includes(req.user.scope)
      let isMatch = scope === req.user.scope

      inArray || isMatch || scope === '*' ? next() : next(new HttpError403())
    }
  }
}
