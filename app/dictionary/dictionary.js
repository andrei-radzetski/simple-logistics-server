const mongoose = require('mongoose')

const properties = {
  key: { type: String, required: true },
  value: { type: String, required: true },
  type: { type: String, required: true }
}

const schema = new mongoose.Schema(properties)

schema.methods = {

  /**
   * Convert object of this class to simple response object.
   *
   * @return {object}
   */
  toResponse: function (extended) {
    let obj = {}

    obj.id = this._id;
    obj.key = this.key;
    obj.value = this.value;
    obj.type = this.type;

    return obj
  }
}

const Dictionary = mongoose.model('Dictionary', schema)

Dictionary.LANGUAGE = 'LANGUAGE'
Dictionary.COUNTRY = 'COUNTRY'
Dictionary.REQUEST_KIND = 'REQUEST_KIND'
Dictionary.REQUEST_SERVICE = 'REQUEST_SERVICE'
Dictionary.TRANSPORT = 'TRANSPORT'

module.exports = Dictionary
