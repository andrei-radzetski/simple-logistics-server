const Rx = require('rx')
const Token = require('./token')

class TokenService {

  /**
   * Disable access token.
   *
   * @param {string} accessToken
   * @returns {Observable<Token>}
   */
  disable (accessToken) {
    let conditions = { accessToken: accessToken }
    let update = { enabled: false }
    let options = { new: true }
    let source = Rx.Observable.fromNodeCallback(Token.findOneAndUpdate, Token)
    return source(conditions, update, options)
  }

  /**
   * Create new access token.
   *
   * If you need to get user with array of tokens add:
   * .flatMap(token => ths._pushTokenToUser(user, token))
   *
   * @param {User} user
   * @param {bool} remember
   * @returns {Observable<Token>}
   */
  create (user, remember) {
    let data = Token.newProperties(user, remember)
    return Rx.Observable.fromNodeCallback(Token.create, Token)(data)
  }

  get(token) {
    return Rx.Observable.create(observer => {
      Token.findOne({ accessToken: token.accessToken })
        .populate('user')
        .exec()
        .then(token => {
          observer.onNext(token)
          observer.onCompleted()
        })
        .catch(err => observer.onError(err))
    })
  }

  /**
   * Find token by key and populate user field.
   *
   * @param {User} user
   * @param {bool} remember
   * @returns {Observable<Token>}
   */
  findTokenUser (accessToken) {
    return Rx.Observable.create(observer => {
      Token.findOne({ accessToken: accessToken })
        .populate('user')
        .exec()
        .then(token => {
          observer.onNext(token)
          observer.onCompleted()
        })
        .catch(err => observer.onError(err))
    })
  }

  /**
   * Push token to user after saving the token and before saving user.
   *
   * @private
   * @param {User} user
   * @param {Token} token
   * @returns {Observable<Token>}
   */
  _pushTokenToUser (user, token) {
    user.tokens.push(token)
    return Rx.Observable.fromNodeCallback(user.save)()
      .flatMap(() => Rx.Observable.return(token))
  }
}

module.exports = new TokenService()
