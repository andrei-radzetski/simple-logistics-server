const config = require('../config')

class Geo {

  constructor(name, fullName, latitude, longitude, placeId) {
    this.name = name
    this.fullName = fullName
    this.latitude = latitude
    this.longitude = longitude
    this.placeId = placeId;
  }

}

module.exports = Geo