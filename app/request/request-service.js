const AbstractService = require('../store').AbstractService
const Request = require('./request')

class RequestService extends AbstractService {

  constructor () {
    super(Request)
  }

}

let instance = new RequestService()
module.exports = instance
