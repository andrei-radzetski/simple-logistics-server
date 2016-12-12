const Route = require('./route')
const logger = require('../logger')(module)
const passport = require('passport')

class Routing {

  /**
   * @typedef Raw
   * @property {string} method - type of the method (GET, POST, PUT ...).
   * @property {string} path - url.
   * @property {bool} straight - if it is true, route path exactly matches defined path.
   * @property {bool|string|Array<string>} protection - if it's true or defined scope,
   * route is protected (available strings: *, admin, user).
   * @property {function} handler - processing request middleware.
   */
  /**
   * @param {Object} app - expressJS app.
   * @param {string} namespace - namespace of the routing.
   * @param {Array<Raw>} raws - raw routing objects.
   */
  constructor (app, namespace, raws) {
    this.app = app
    this.namespace = namespace
    this.routesWithNamespace = []
    this.routesWithoutNamespace = []
    this._createRoutesFromRaws(raws)
  }

  /**
   * @private
   * Create routing objects from {@link Routing#raws}
   * array of route data.
   *
   * @param {Array<Raw>} raws - raw routing objects.
   */
  _createRoutesFromRaws (raws) {
    if (raws && Array.isArray(raws)) {
      for (let raw of raws) {
        let protect = raw.protection ? passport.authenticate('bearer', { session: false }) : null
        let scope = raw.protection ? this._createScopeMiddleware(raw.protection) : null
        let route = new Route(raw.method, raw.path, protect, scope, raw.handler, raw.straight)

        this.addRoute(route)
      }
    }
  }

  _createScopeMiddleware (scope) {
    if (scope && (typeof scope === 'boolean' || scope instanceof Boolean)) {
      return passport.scope('*')
    }

    if (scope && (Array.isArray(scope) || typeof scope === 'string' || scope instanceof String)) {
      return passport.scope(scope)
    }

    return null
  }

  /**
   * Add route to the list applying.
   * Route won't apply, to apply needs to call {@link Routing#commit}.
   *
   * @param {Route} route
   */
  addRoute (route) {
    route.straight
      ? this.routesWithoutNamespace.push(route)
      : this.routesWithNamespace.push(route)
  }

  /**
   * Apply all routing methods to the app.
   */
  commit () {
    let ths = this

    for (let route of this.routesWithoutNamespace) {
      this._registerRoute(route)
    }

    this.app.namespace(this.namespace, () => {
      for (let route of this.routesWithNamespace) {
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

      case Route.PUT:
        this._registerMethod(this.app.put, route)
        break

      default:
        logger.warn('Unknown route (namespace=[%s]): %s', route.straight ? '' : this.namespace, route.toString())
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

    let pr = route.protection ? '(-)' : '(+)'
    logger.info('Mapped: %s -> %s -> %s%s', pr, route.method, route.straight ? '' : this.namespace, route.path)
  }
}

module.exports = Routing
