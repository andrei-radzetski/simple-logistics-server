const cors = require('cors')

class Route {

  static get GET () {
    return 'GET'
  }

  static get POST () {
    return 'POST'
  }

  static get PUT () {
    return 'PUT'
  }

  /**
   * @property {string} method - type of the method (GET, POST, PUT ...).
   * @property {string} path - url.
   * @property {function} protection - protecting middleware.
   * @property {function} scope - scope protection middleware.
   * @property {function} handler - processing request middleware.
   * @property {bool} straight - if it is true, route path exactly matches defined path.
   */
  constructor (method, path, protection, scope, handler, straight) {
    this.method = method
    this.path = path
    this.protection = protection
    this.scope = scope
    this.handler = handler
    this.straight = straight
  }

  /**
   * Create array of arguments to register route function.
   * If protect middleware isn't null, array consists of tree
   * elements (first - path, second - protection, third - handler),
   * otherwise array consists of two elemens
   * (first - path, second - handler).
   *
   * @returns {Array<Object>}
   */
  toArguments () {
    return this.protection != null
      ? [this.path, cors(), this.protection, this.scope, this.handler]
      : [this.path, cors(), this.handler]
  }

  toString () {
    return this.method + ' -> "' + this.path + '"'
  }
}

module.exports = Route
