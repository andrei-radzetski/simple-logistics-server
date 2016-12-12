const HttpError = require('./http-error')
/**
 * 403 Forbidden.
 */
class HttpError403 extends HttpError {
  
  constructor(message) {
    super(403, message)
    
    this.name = this.constructor.name
    this.message = message ? message : 'Forbidden'
    
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
  
}

module.exports = HttpError403