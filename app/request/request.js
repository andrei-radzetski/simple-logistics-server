const mongoose = require('mongoose')

const properties = {
  kind: { type: String, required: true },
  service: { type: String, required: true },
  seatsNumber: { type: Number, required: true },
  transport: { type: String, required: true },
  name: { type: String },
  width: { type: Number },
  height: { type: Number },
  length: { type: Number },
  weight: { type: Number },
  displayEmail: { type: Boolean, default: false, required: true },
  displayPhone: { type: Boolean, default: false, required: true },
  // points,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: { type: String },
  enabled: { type: Boolean, default: true },
  creationDate: { type: Date, default: new Date(), required: true }
}

const schema = new mongoose.Schema(properties)

schema.methods = {

  /**
   * Convert object of this class to simple response object.
   *
   * @return {object}
   */
  toResponse: function () {
    let obj = {}

    obj.id = this._id
    obj.comment = this.comment
    obj.enabled = this.enabled
    obj.creationDate = this.creationDate

    return obj
  }
}

module.exports = mongoose.model('Request', schema)
