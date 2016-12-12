const HttpError = require('./http-error')
/**
 * 500 Internal Server Error.
 */
class HttpError500 extends HttpError {
  
  constructor(message) {
    super(500, message)
    
    this.name = this.constructor.name
    this.message = message ? message : 'Internal Server Error'
    
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }

}

module.exports = HttpError500
