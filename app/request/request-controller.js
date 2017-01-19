const AbstractController = require('../rest').AbstractController
const requestService = require('./request-service')
const RestUtil = require('../rest/rest-util')

class RequestController extends AbstractController {

  constructor () {
    super(requestService)
  }

  filter(req, res, next) {
    let self = this

    self.service.find(req.query)
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(self.createResponseBoby(data)),
        err => next(err))
  }

  create(req, res, next) {
    let ths = this

    req.body.user = req.user._id
    
    this.service.create(req.body)
      .flatMap((model, numAffected) => RestUtil.dataToResponse(model))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

}

module.exports = new RequestController()
