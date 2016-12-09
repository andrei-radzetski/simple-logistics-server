class Route {

  static get GET () {
    return 'GET'
  }

  static get POST () {
    return 'POST'
  }

  constructor (method, path, protect, handler) {
    this.method = method
    this.path = path
    this.protect = protect
    this.handler = handler
  }

  /**
   * Create array of arguments to register route function.
   * If protect middleware isn't null, array consists of tree
   * elements (first - path, second - protect, third - handler),
   * otherwise array consists of two elemens
   * (first - path, second - handler).
   *
   * @returns {Array}
   */
  toArguments () {
    return this.protect != null
      ? [this.path, this.protect, this.handler]
      : [this.path, this.handler]
  }

  toString () {
    return this.method + ' -> "' + this.path + '"'
  }
}

module.exports = Route
