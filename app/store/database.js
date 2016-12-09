const Rx = require('rx')
const logger = require('../logger')(module)

class Database {

  constructor (mongoose, uri, options) {
    this.mongoose = mongoose
    this.uri = uri
    this.options = options
    this.connection = null
  }

    /**
     * Connect to database.
     * @returns {Rx.Observable}
     */
  connect () {
    let ths = this

    return Rx.Observable.create(observer => {
      ths.mongoose.connect(ths.uri, ths.options)

            /**
             * Listening to connection fail.
             */
      ths.mongoose.connection.on('error', err => {
        logger.error(err)
        observer.onError(err)
      })

            /**
             * Listening to connection success.
             */
      ths.mongoose.connection.once('open', () => {
        logger.info('Database was opened.')
        ths.db = ths.mongoose.connection
        observer.onNext()
        observer.onCompleted()
      })

            /**
             * Listening to connection close.
             */
      ths.mongoose.connection.on('close', () => {
        logger.info('Database was closed.')
        ths.db = null
      })
    })
  }

}

module.exports = Database
