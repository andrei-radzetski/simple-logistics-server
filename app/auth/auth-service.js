const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Rx = require('rx')

module.exports = {

  init: (findByLogin, findById) => {
    // Serialize user instances to and from the session.
    passport.serializeUser((user, done) => done(null, user._id))

    // Deserialize user instances to and from the session.
    passport.deserializeUser((id, done) => {
      findById(id).subscribe(
        user => done(null, user),
        err => done(err, null))
    })

    // If the credentials are valid, the verify callback
    // invokes "done" to supply Passport with the user
    // that authenticated.
    passport.use(new LocalStrategy((login, password, done) => {
      let _user

      findByLogin(login)
        .flatMapObserver(
          user => {
            _user = user

            return _user
              ? _user.comparePassword(password)
              : Rx.Observable.throw({ message: 'User not found.' })
          },
          err => Rx.Observable.throw(err),
          () => Rx.Observable.empty())
        .subscribe(
          isMatch => isMatch ? done(null, _user) : done(null, false, { message: 'Incorrect password.' }),
          err => done(null, false, err))
    }))

    // Middleware. Check user already authenticated.
    passport.protect = () => (req, res, next) => req.isAuthenticated() ? next() : res.sendStatus(401)
  }
}
