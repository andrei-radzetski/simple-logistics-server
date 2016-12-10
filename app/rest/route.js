class Route {

  static get GET () {
    return 'GET'
  }

  static get POST () {
    return 'POST'
  }

  /**
   * @property {string} method - type of the method (GET, POST, PUT ...).
   * @property {string} path - url.
   * @property {Object} protection - protecting middleware.
   * @property {function} handler - processing request middleware.
   */
  constructor (method, path, protection, handler) {
    this.method = method
    this.path = path
    this.protection = protection
    this.handler = handler
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
      ? [this.path, this.protection, this.handler]
      : [this.path, this.handler]
  }

  toString () {
    return this.method + ' -> "' + this.path + '"'
  }
}

module.exports = Route
