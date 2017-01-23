const AbstractController = require('../rest').AbstractController
const messageService = require('./message-service')
const RestUtil = require('../rest/rest-util')

class MessageController extends AbstractController {

  constructor () {
    super(messageService)
  }

  create(req, res, next) {
    let ths = this
    let params = req.body
    params.sender = req.user._id
    params.read = false
    params.date = new Date()
    
    this.service.create(params)
      .flatMap((model, numAffected) => RestUtil.dataToResponse(model))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

  inbox(req, res, next) {
    let ths = this
    let params = { recipient: req.user._id }
    
    this.service.find(params, null, { sort: { date: -1 }})
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

  outbox(req, res, next) {
    let ths = this
    let params = { sender: req.user._id }
    
    this.service.find(params, null, { sort: { date: -1 }})
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

  read(req, res, next) {
    let ths = this

    ths.service.read(req.params.id, req.user._id)
      .flatMap(data => RestUtil.dataToResponse(data))
      .subscribe(
        data => res.json(ths.createResponseBoby(data)),
        err => next(err))
  }

}

module.exports = new MessageController()
