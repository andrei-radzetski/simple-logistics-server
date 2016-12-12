const HttpError = require('./http-error')
/**
 * 401 Unauthorized.
 */
class HttpError401 extends HttpError {

  constructor (message) {
    message = message == null ? message : 'Unauthorized'
    super(401, message)

    this.name = this.constructor.name
    this.message = message

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }

}

module.exports = HttpError401
