class HttpError extends Error {
  
  constructor(code, message) {
    super(message)
    
    this.name = this.constructor.name
    this.message = message
    this.code = code
    
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }

  toString() {
    return this.stack ? this.stack : (this.name + ' ' + this.code + ': ' + this.message)
  }
  
}

module.exports = HttpError