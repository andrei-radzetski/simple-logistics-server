const AbstractService = require('../store').AbstractService
const Dictionary = require('./dictionary')
const Rx = require('rx')

class DictionaryService extends AbstractService {

  constructor() {
    super(Dictionary)
  }

  /**
   * @return {Array<String>}
   */
  getTypes() {
    return Rx.Observable.return([
      Dictionary.LANGUAGE,
      Dictionary.COUNTRY,
      Dictionary.REQUEST_KIND,
      Dictionary.REQUEST_SERVICE,
      Dictionary.TRANSPORT
    ])
  }

}

module.exports = new DictionaryService()