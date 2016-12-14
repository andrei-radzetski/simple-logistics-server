class ValidationError extends Error {

  constructor (message) {
    super(message)

    this.name = this.constructor.name
    this.message = message

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }

  toString () {
    return this.stack ? this.stack : (this.name + ' ' + this.code + ': ' + this.message)
  }

}

module.exports = ValidationError
