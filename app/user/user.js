const mongoose = require('mongoose')
const config = require('../config')
const AuthUtil = require('../auth/auth-util')
const logger = require('../logger')(module)

const properties = {
  email: { type: String, required: true, unique: true, maxlength: 50 },
  phone: { type: String, required: true, unique: true, maxlength: 13 },
  password: { type: String, required: true },
  firstName: { type: String, required: true, maxlength: 50 },
  secondName: { type: String, required: true, maxlength: 50 },
  
  country: { type: String, maxlength: 3 },
  city: { type: String, maxlength: 50 },
  language: { type: String, maxlength: 3 },
  additionalInfo: { type: String, maxlength: 500 },
  
  confirmed: { type: Boolean, default: true },
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
    obj.country = this.country
    obj.city = this.city
    obj.additionalInfo = this.additionalInfo

    if(extended) {
      obj.language = this.language
      obj.scope = this.scope
      obj.confirmed = this.confirmed
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
