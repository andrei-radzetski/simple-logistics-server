const mongoose = require('mongoose')
const config = require('../config')
const AuthUtil = require('../auth').AuthUtil

const properties = {
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  creationDate: { type: Date, default: new Date(), required: true }
}

const schema = new mongoose.Schema(properties)

schema.methods = {

  /**
   * Convert object of this class to simple response object.
   *
   * @returns {Object}
   */
  toResponse: function () {
    let obj = {}

    obj.id = this._id
    obj.email = this.email
    obj.phone = this.phone
    obj.firstName = this.firstName
    obj.secondName = this.secondName

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
      hash => { ths.password = hash },
      err => next(err),
      () => next())
})

module.exports = mongoose.model('User', schema)
