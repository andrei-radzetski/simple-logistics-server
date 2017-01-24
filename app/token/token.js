const mongoose = require('mongoose')
const AuthUtil = require('../auth/auth-util')
const config = require('../config')

const properties = {
  accessToken: { type: String, required: true, unique: true },
  creationDate: { type: Date, default: new Date(), required: true },
  expires: { type: Number, required: true },
  enabled: { type: Boolean, default: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}

const schema = new mongoose.Schema(properties)

schema.statics = {

  /**
   * Create token properties by params.
   *
   * @param {User} user
   * @param {bool} remember
   * @returns {Object}
   */
  newProperties: function (user, remember) {
    return {
      accessToken: AuthUtil.genToken(config.get('auth:tokenLength')),
      expires: remember ? config.get('auth:rememberLong') : config.get('auth:rememberShort'),
      user: user._id,
    }
  }
}

schema.methods = {

  /**
   * Convert object of this class to simple response object.
   *
   * @returns {Object}
   */
  toResponse: function () {
    let obj = {}

    obj.accessToken = this.accessToken
    obj.expires = this.expires
    obj.scope = this.user ? this.user.scope : 'user';
    obj.user = this.user ? this.user._id : undefined;

    return obj
  },

  /**
   * Expires checking
   *
   * @returns {bool}
   */
  isExpired: function () {
    let startTime = this.creationDate.getTime()
    let finishTime = startTime + this.expires
    let currentTime = new Date().getTime()

    return currentTime > finishTime
  }
}

module.exports = mongoose.model('Token', schema)
