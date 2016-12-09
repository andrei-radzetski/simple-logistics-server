const Route = require('./route')
const logger = require('../logger')(module)
const passport = require('passport')

class Routing {

  constructor (app, namespace, raws) {
    this.app = app
    this.namespace = namespace
    this.raws = raws
    this.routers = []
    this._createRoutesFromRaws()
  }

  /**
   * Create {Route} objects from {@link Routing#raws}
   * array of route data.
   *
   * @private
   */
  _createRoutesFromRaws () {
    if (this.raws && Array.isArray(this.raws)) {
      for (let raw of this.raws) {
        let protect = raw.protected ? passport.protect() : null
        let route = new Route(raw.method, raw.path, protect, raw.handler)

        this.addRoute(route)
      }
    }
  }

  /**
   * Add route to the list applying.
   * Route won't apply, to apply needs to call {@link Routing#commit}.
   *
   * @param {Route} route
   * @public
   */
  addRoute (route) {
    this.routers.push(route)
  }

  /**
   * Apply all routing methods to the app.
   *
   * @public
   */
  commit () {
    let ths = this

    this.app.namespace(this.namespace, () => {
      for (let route of this.routers) {
        ths._registerRoute(route)
      }
    })
  }

  /**
   * Register route in the app by the method.
   *
   * @param {Route} route - local route.
   * @private
   */
  _registerRoute (route) {
    switch (route.method) {

      case Route.GET:
        this._registerMethod(this.app.get, route)
        break

      case Route.POST:
        this._registerMethod(this.app.post, route)
        break

      default:
        logger.warn('Unknown route (namespace=[%s]): %s', this.namespace, route.toString())
        logger.warn('Add this method to the {rest.Routing#_registerRoute}')
        break
    }
  }

  /**
   * Apply router method to the app.
   *
   * @param {function} fn - app router function.
   * @param {Route} route - local route.
   * @private
   */
  _registerMethod (fn, route) {
    fn.apply(this.app, route.toArguments())
    logger.info('Mapped: %s -> %s%s', route.method, this.namespace, route.path)
  }
}

module.exports = Routing
