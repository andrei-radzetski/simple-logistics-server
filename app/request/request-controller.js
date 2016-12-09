const AbstractController = require('../rest').AbstractController
const requestService = require('./request-service')

class RequestController extends AbstractController {

  constructor () {
    super(requestService)
  }

}

let instance = new RequestController()
module.exports = instance
