const HttpError = require('./http-error')
/**
 * 404 Page not found.
 */
class HttpError404 extends HttpError {
  
  constructor(message) {
    super(404, message)
    
    this.name = this.constructor.name
    this.message = message ? message : 'Page not found'
    
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
  
}

module.exports = HttpError404