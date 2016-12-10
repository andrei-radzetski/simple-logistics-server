const bcrypt = require('bcrypt')
const Rx = require('rx')

class AuthUtil {

  /**
   * Generate salt by salt round.
   *
   * @param {number} saltRounds
   * @return {Observable<string>}
   */
  static genSalt (saltRounds) {
    return Rx.Observable.fromNodeCallback(bcrypt.genSalt)(saltRounds)
  }

  /**
   * Generate hash for string by the salt.
   *
   * @param {string} str
   * @param {string} salt
   * @return {Observable<string>}
   */
  static genHash (str, salt) {
    return Rx.Observable.fromNodeCallback(bcrypt.hash)(str, salt)
  }

  /**
   * Compare original string to hashed.
   *
   * @param {string} original - original string
   * @param {string} hashed - hashed string
   * @return {Observable<bool>}
   */
  static compareHashed (original, hashed) {
    return Rx.Observable.fromNodeCallback(bcrypt.compare)(original, hashed)
  }

  /**
   * Generate hash for string.
   *
   * @param {string} str
   * @param {number} saltRounds
   * @return {Observable<string>}
   */
  static genHashedString (str, saltRounds) {
    return AuthUtil
      .genSalt(saltRounds)
      .flatMap(salt => AuthUtil.genHash(str, salt))
  }

}

module.exports = AuthUtil
