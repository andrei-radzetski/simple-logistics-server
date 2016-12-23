const mongoose = require('mongoose')

const properties = {
  key: { type: String, required: true },
  value: { type: String, required: true },
  type: { type: String, required: true },
  description: String
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
    obj.description = this.description;

    return obj
  }
}

const Dictionary = mongoose.model('Dictionary', schema)

Dictionary.LANGUAGE = 'language'
Dictionary.COUNTRY = 'country'
Dictionary.REQUEST_KIND = 'request-kind'
Dictionary.REQUEST_SERVICE = 'request-service'
Dictionary.TRANSPORT = 'transport'

module.exports = Dictionary
