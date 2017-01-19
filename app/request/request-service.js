const AbstractService = require('../store').AbstractService
const Request = require('./request')
const Rx = require('rx')

class RequestService extends AbstractService {

  constructor () {
    super(Request)
  }

  /**
   * @returns {Observable<Object>}
   */
  createNewInstance(data) {
    return Rx.Observable.return(new Request(data));
  }

}

module.exports = new RequestService()
