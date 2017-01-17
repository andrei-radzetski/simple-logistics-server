const config = require('../config')
const request = require('request')
const urlencode = require('urlencode')
const Observable = require('rx').Observable
const Geo = require('./geo')

class GeoService {

  formUrl(name) {
    return 'https://maps.googleapis.com/maps/api/geocode/json?language=ru&types=locality|political&address=' + name + '&key=' + config.get('google:apiKey')
  }

  find(name) {
    return Observable.create(observer => {
      name = urlencode(name);

      var options = {
        url: this.formUrl(name)
      };

      request(options, (error, response, body) => {
        if (error || response == null || response.statusCode != 200) {
          observer.onError(error)
        } else {
          observer.onNext(this.parse(body))
          observer.onCompleted()
        }
      })
    })
  }


  parse(body) {
    let temp = JSON.parse(body)
    let geos = []

    if (temp.results) {
      for (let tempGeo of temp.results) {
        if (tempGeo &&
          tempGeo.formatted_address &&
          tempGeo.geometry &&
          tempGeo.geometry.location &&
          tempGeo.geometry.location.lat &&
          tempGeo.geometry.location.lng &&
          tempGeo.address_components &&
          tempGeo.address_components[0] &&
          tempGeo.address_components[0].long_name &&
          tempGeo.place_id)

          geos.push(new Geo(tempGeo.address_components[0].long_name, tempGeo.formatted_address, tempGeo.geometry.location.lat, tempGeo.geometry.location.lng, tempGeo.place_id))
      }
    }
    return geos
  }
}

module.exports = new GeoService()