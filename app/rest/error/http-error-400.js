const HttpError = require('./http-error')
/**
 * 400 Bad Request.
 */
class HttpError400 extends HttpError {

  constructor (message) {
    message = message == null ? message : 'Bad Request'
    super(400, message)

    this.name = this.constructor.name
    this.message = message

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }

}

module.exports = HttpError400
