const mongoose = require('mongoose')
const config = require('../config')
const AuthUtil = require('../auth/auth-util')
const logger = require('../logger')(module)

const properties = {
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  
  confirmed: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  creationDate: { type: Date, default: new Date(), required: true },
  // *, admin, user
  scope: { type: String, default: 'user', required: true }/*,
  tokens: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Token'
  }] */
}

const schema = new mongoose.Schema(properties)

schema.methods = {

  /**
   * Convert object of this class to simple response object.
   *
   * @returns {Object}
   */
  toResponse: function (extended) {
    let obj = {}

    obj.id = this._id
    obj.email = this.email
    obj.phone = this.phone
    obj.firstName = this.firstName
    obj.secondName = this.secondName

    if(extended) {
      obj.scope = this.scope
    }

    return obj
  },

  /**
   * Compare password.
   *
   * @param {string} password
   * @returns {Observable<bool>}
   */
  comparePassword: function (password) {
    return AuthUtil.compareHashed(password, this.password)
  }
}

schema.pre('save', function (next) {
  // TODO: Unchecked format of email, phone, password, firstName, secondName
  logger.warn('Unchecked format of email, phone, password, firstName, secondName')

  var ths = this

  // only hash the password if it has been modified (or is new)
  if (!ths.isModified('password')) {
    return next()
  }

  /*
   * Generate password hash.
   */
  AuthUtil.genHashedString(ths.password, config.get('auth:saltRounds'))
    .subscribe(
      hash => ths.password = hash,
      err => next(err),
      () => next())
})

module.exports = mongoose.model('User', schema)
