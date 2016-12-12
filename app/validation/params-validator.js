const ParamValidator = require('./param-validator')
const Observable = require('rx').Observable

class ParamsValidator {

  /**
   * @typedef RawParam
   * @property {string} name - param name.
   * @property {Object|undefined} value - value of the param.
   * @property {string} type - type of the param (ParamValidator.EMAIL, ParamValidator.PHONE ... )
   * @property {boolean} required - requirement of the param.
   * @property {function} condition - aditional validation condition.
   */
  /**
   * @param {Array<RawParam>} raws
   */
  constructor (raws) {
    if (raws == null || !Array.isArray(raws)) {
      throw new TypeError('Argument "raws" must by array.')
    }

    this.params = []
    this._init(raws)
  }

  /**
   * Initialize params validator.
   */
  _init (raws) {
    for (let raw of raws) {
      this.params.push(new ParamValidator(raw.name, raw.value, raw.type, raw.required, raw.condition))
    }
  }

  /**
   * Validate params, if valid return object
   * of values ({ fieldname1: fieldvalue1, fieldname2: fieldvalue2, ... }
   * if invalid throw error.
   *
   * @return {Observable}
   */
  validate () {
    return Observable.fromArray(this.params)
      .filter(param => !param.validate())
      .map(param => param.createMessage())
      .toArray()
      .flatMap(array => {
        return array != null && array.length > 0
            ? Observable.throw({ message: array.join('; ') })
            : Observable.fromArray(this.params)
      })
      .reduce((acc, x) => {
        acc[x.name] = x.value
        return acc
      }, {})
  }

}

module.exports = ParamsValidator
