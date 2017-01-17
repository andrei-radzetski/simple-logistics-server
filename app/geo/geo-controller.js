const geoService = require('./geo-service')
const RestUtil = require('../rest/rest-util')

class GeoController {

  /**
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @param {function} next
   */
  find(req, res, next) {
    geoService.find(req.params.name)
      .subscribe(
      data => res.json(RestUtil.createResponseBoby(data)),
      err => next(err))
  }

}

module.exports = new GeoController()