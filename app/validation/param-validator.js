const ValidationUtil = require('./validation-util')
const logger = require('../logger')(module)

class ParamValidator {

  static get EMAIL () {
    return 'EMAIL'
  }

  static get PHONE () {
    return 'PHONE'
  }

  static get STRING () {
    return 'STRING'
  }

  static get NUMBER () {
    return 'NUMBER'
  }

  static get BOOLEAN () {
    return 'BOOLEAN'
  }

  static get OBJECT_ID () {
    return 'OBJECT_ID'
  }

  /**
   * @param {string} name - param name.
   * @param {Object|undefined} value - value of the param.
   * @param {string} type - type of the param (EMAIL, PHONE ... see above)
   * @param {boolean} required - requirement of the param.
   * @param {function} condition - aditional validation condition.
   */
  constructor (name, value, type, required, condition) {
    if (!ValidationUtil.isString(name)) {
      throw new TypeError('Field "name" must have string type.')
    }

    if (!ValidationUtil.isString(type)) {
      throw new TypeError('Field "type" must have string type.')
    }

    this.name = name
    this.value = ValidationUtil.isString(value) && ValidationUtil.isStringBlank(value) ? null : value
    this.type = type
    this.required = !!required
    this.condition = ValidationUtil.isFunction(condition) ? condition : null
    this.error = false
    this.message = null
  }

  /**
   * @returns {boolean}
   */
  validate () {
    let exists = this._validateRequired()

    if (this.required && !exists) {
      return this._markAsError('is undefined')
    }

    if (exists && !this._validateType()) {
      return this._markAsError(' isn\'t ' + this.type)
    }

    if (this.condition != null && !this.condition(this.value)) {
      return this._markAsError(' is wrong')
    }

    this.value = exists ? ParamValidator.convert(this.value, this.type) : this.value

    return this._markAsValid()
  }

  /**
   * @private
   * Validate field by the required.
   *
   * @returns {boolean}
   */
  _validateRequired () {
    switch (this.type) {

      case ParamValidator.EMAIL:
      case ParamValidator.PHONE:
      case ParamValidator.STRING:
        return !ValidationUtil.isStringBlank(this.value)

      case ParamValidator.NUMBER:
        return this.value != null

      case ParamValidator.BOOLEAN:
        return this.value != null

      case ParamValidator.OBJECT_ID:
        return !ValidationUtil.isStringBlank(this.value)

      default:
        throw new TypeError('Unknown type "' + this.type + '"')
    }
  }

  /**
   * @private
   * Validate field by the type.
   *
   * @returns {boolean}
   */
  _validateType () {
    switch (this.type) {

      case ParamValidator.EMAIL:
        return ValidationUtil.isEmail(this.value)

      case ParamValidator.PHONE:
        return ValidationUtil.isPhone(this.value)

      case ParamValidator.STRING:
        return ValidationUtil.isString(this.value)

      case ParamValidator.NUMBER:
        return ValidationUtil.isNumber(this.value, true)

      case ParamValidator.BOOLEAN:
        return ValidationUtil.isBoolean(this.value, true)

      case ParamValidator.OBJECT_ID:
        return ValidationUtil.isObjectId(this.value)

      default:
        throw new TypeError('Unknown type "' + this.type + '"')
    }
  }

  /**
   * Mark param as invalid.
   * All the time returns false.
   *
   * @return {boolean}
   */
  _markAsError (message) {
    this.error = true
    this.message = message
    return false
  }

  /**
   * Mark param as valid.
   * All the time returns true.
   *
   * @return {boolean}
   */
  _markAsValid () {
    this.error = false
    this.message = null
    return true
  }

  /**
   * Create message. Format "name" + "message".
   * @returns {string}
   */
  createMessage () {
    return this.error ? ('"' + this.name + '"' + this.message) : null
  }

  /**
   * Conver the value to native type by user type (EMAIL, PHONE ...)
   *
   * @param {any} value
   * @param {string} type
   *
   * @return {any}
   */
  static convert (value, type) {
    switch (type) {

      case ParamValidator.EMAIL:
      case ParamValidator.PHONE:
      case ParamValidator.STRING:
        return value.toString()

      case ParamValidator.NUMBER:
        // TODO: verify
        logger.warn('Not Verified')
        return Number(value)

      case ParamValidator.BOOLEAN:
        return ValidationUtil.isBoolean(value) ? value : value === 'true'

      case ParamValidator.OBJECT_ID:
        // TODO: verify
        logger.warn('Not Verified')
        return value.toString()

      default:
        throw new TypeError('Unknown type "' + type + '"')
    }
  }

}

module.exports = ParamValidator
