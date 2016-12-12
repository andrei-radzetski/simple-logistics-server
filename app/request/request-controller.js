const AbstractController = require('../rest').AbstractController
const requestService = require('./request-service')

class RequestController extends AbstractController {

  constructor () {
    super(requestService)
  }

}

module.exports = new RequestController()
