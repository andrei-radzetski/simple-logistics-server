const AbstractService = require('../store').AbstractService
const Dictionary = require('./dictionary')

class DictionaryService extends AbstractService {

  constructor () {
    super(Dictionary)
  }

}

module.exports = new DictionaryService()