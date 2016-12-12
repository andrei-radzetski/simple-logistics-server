class ValidationUtil {

  /**
   * Email validation.
   * {@link http://emailregex.com}
   *
   * @param {string} email
   * @returns {boolean}
   */
  static isEmail (email) {
    let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email != null && regexp.test(email)
  }

  /**
   * Phone validation.
   * Format: "xxxxxxxxxxxxxxxxx".
   * Minimum number of digits for a mobile number is 4 [Country:Saint Helena].
   * Max digits for a mobile number is 13 [Country: Austria].
   * {@link https://www.quora.com/What-is-the-length-of-mobile-phone-numbers-all-over-the-world-And-what-are-the-lengths-of-country-codes}
   *
   * @param {string} phone
   * @returns {boolean}
   */
  static isPhone (phone) {
    let regexp = /^(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
    return phone != null && regexp.test(phone)
  }

  /**
   * @returns {boolean}
   */
  static isString (str) {
    return str != null && (typeof str === 'string' || str instanceof String)
  }

  /**
   * @returns {boolean}
   */
  static isStringBlank (str) {
    return str == null || /^\s*$/.test(str)
  }

  /**
   * @param {function} value
   *
   * @returns {boolean}
   */
  static isFunction (value) {
    return value != null && (typeof value === 'function' || value instanceof Function)
  }

  /**
   * Is it integer?
   *
   * @param {number|string} value
   * @param {boolean} canBeString - if true, method can expect value like string, for example "1223"
   * @returns {boolean}
   */
  static isNumber (value, canBeString) {
    if (canBeString && ValidationUtil.isString(value)) {
      return /^\d+$/.test(value)
    }

    return value != null && (typeof value === 'number' || value instanceof Number)
  }

  /**
   * @param {boolean|string} value
   * @param {boolean} canBeString - if true, method can expect value like string, for example "false"
   * @returns {boolean}
   */
  static isBoolean (value, canBeString) {
    if (canBeString && ValidationUtil.isString(value)) {
      return /(^true$)|(^false$)/.test(value)
    }

    return value != null && (typeof value === 'boolean' || value instanceof Boolean)
  }

  /**
   * @param {string} value
   * @returns {boolean}
   */
  static isObjectId (value) {
    return /^[0-9a-fA-F]{24}$/.test(value)
  }

}

module.exports = ValidationUtil
