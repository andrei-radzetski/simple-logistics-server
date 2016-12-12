const HttpError = require('./http-error')
/**
 * 404 Page not found.
 */
class HttpError404 extends HttpError {

  constructor (message) {
    message = message == null ? message : 'Page not found'
    super(404, message)

    this.name = this.constructor.name
    this.message = message

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }

}

module.exports = HttpError404
