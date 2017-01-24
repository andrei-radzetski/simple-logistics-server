const mongoose = require('mongoose')

const properties = {
  latitude: {type: Number, required: true },
  longitude: { type: Number, required: true },
  name: { type: String },
  radius: {
    type: Number
  },
  radiusUnitFactor: {
    type: Number
  },
  start: {
    type: Boolean,
    default: false,
    required: true
  },
  end: {
    type: Boolean,
    default: false,
    required: true
  },
  arrivalDatetime: {
    type: Date,
    required: true
  },
  departureDatetime: {
    type: Date,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  placeId: {
    type: String
  },
  editable: {
    type: Boolean,
    default: true
  },
  enabled: {
    type: Boolean,
    default: true
  },
  length: {
    type: Number
  },
  creationDate: { type: Date, default: new Date(), required: true }
}

const schema = new mongoose.Schema(properties)

schema.statics = {

  toResponse: function (point) {
    let obj = {}

    obj.id = point._id
    obj.latitude = point.latitude
    obj.longitude = point.longitude
    obj.name = point.name
    obj.radius = point.radius
    obj.radiusUnitFactor = point.radiusUnitFactor
    obj.start = point.start
    obj.end = point.end
    obj.arrivalDatetime = point.arrivalDatetime
    obj.departureDatetime = point.departureDatetime
    obj.order = point.order
    obj.placeId = point.placeId
    obj.editable = point.editable
    obj.enabled = point.enabled
    obj.creationDate = point.creationDate
    
    return obj;
  }
}

schema.methods = {

  /**
   * Convert object of this class to simple response object.
   *
   * @return {object}
   */
  toResponse: function () {
    return this.toResponse(this);
  }
}

module.exports = mongoose.model('Point', schema)