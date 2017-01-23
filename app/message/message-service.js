const AbstractService = require('../store').AbstractService
const Message = require('./message')
const Rx = require('rx')

class MessageService extends AbstractService {

  constructor() {
    super(Message)
  }

  /**
   * @returns {Observable<Message>}
   */
  createNewInstance(data) {
    return Rx.Observable.return(new Message(data));
  }

  find(params, projection, options) {
    let self = this
    return Rx.Observable.create(observer => {
      self.clazz
        .find(params, projection, options)
        .populate('sender')
        .populate('recipient')
        .exec((err, msg) => {
          if (err) {
            observer.onError(err)
          } else {
            observer.onNext(msg)
            observer.onCompleted()
          }
        });
    });
  }

  /**
   * Get object by id.
   *
   * @param {string|ObjectId} id - the identifier of the desired object.
   * @returns {Observable<Object>}
   */
  findById(id) {
    let self = this
    return Rx.Observable.create(observer => {
      self.clazz
        .findById(id)
        .populate('sender')
        .populate('recipient')
        .exec((err, msg) => {
          if (err) {
            observer.onError(err)
          } else {
            observer.onNext(msg)
            observer.onCompleted()
          }
        });
    });
  }

  read(id, recipient) {
    let body = { read: true }
    let cond = { _id: id, recipient: recipient }

    let options = { new: true }
    let source = Rx.Observable.fromNodeCallback(this.clazz.findOneAndUpdate, this.clazz)
    return source(cond, body, options)
  }
}

module.exports = new MessageService()