const mongoose = require('mongoose')
const Point = require('../point/point')

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
  points: [ 'Point' ],
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
    obj.kind = this.kind
    obj.service = this.service
    obj.seatsNumber = this.seatsNumber
    obj.transport = this.transport
    obj.name = this.name
    obj.width = this.width
    obj.height = this.height
    obj.length = this.length
    obj.weight = this.weight
    obj.displayEmail = this.displayEmail
    obj.displayPhone = this.displayPhone
    obj.user = this.user
    obj.comment = this.comment
    obj.enabled = this.enabled
    obj.creationDate = this.creationDate
    obj.points = [];
    
    for(let point of this.points) {
      obj.points.push(Point.toResponse(point))
    }

    return obj
  }
}

module.exports = mongoose.model('Request', schema)
