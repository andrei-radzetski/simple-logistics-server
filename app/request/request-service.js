const AbstractService = require('../store').AbstractService
const Request = require('./request')

class RequestService extends AbstractService {

  constructor () {
    super(Request)
  }

}

module.exports = new RequestService()
