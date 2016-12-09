/**
 * @abstract
 */
class AbstractController {

  constructor (service) {
    if (new.target === AbstractController) {
      throw new TypeError('Cannot construct abstract instances directly.')
    }

    if (service == null) {
      throw new TypeError('Service must be defined.')
    }

    this.service = service
  }

  /**
   *
   */
  createResponseBoby (data, error, message) {
    return error ? { data: null, error: true, message: message }
      : { data: data, error: false, message: null }
  }

  /**
  * @private
  */
  _applySubscribe (context, fn, res, params) {
    fn.apply(context, params)
      .subscribe(
      data => res.json(this.createResponseBoby(data)),
      err => res.json(this.createResponseBoby(null, err, err.message)))
  }

  /**
   *
   */
  get (req, res, next) {
    if (typeof this.service.get !== 'function') {
      throw new TypeError('Service doesn\'t have "get" method.')
    }

    let data = req.params.id

    this._applySubscribe(this.service, this.service.get, res, [data])
  }

  /**
   *
   */
  list (req, res, next) {
    if (typeof this.service.list !== 'function') {
      throw new TypeError('Service doesn\'t have "list" method.')
    }

    this._applySubscribe(this.service, this.service.list, res, [])
  }
}

module.exports = AbstractController
