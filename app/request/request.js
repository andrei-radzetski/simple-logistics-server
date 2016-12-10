const mongoose = require('mongoose')

const properties = {
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
