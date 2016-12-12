const HttpError = require('./http-error')
/**
 * 400 Bad Request.
 */
class HttpError400 extends HttpError {
  
  constructor(message) {
    super(400, message)
    
    this.name = this.constructor.name
    this.message = message ? message : 'Bad Request'
    
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }

}

module.exports = HttpError400