const bodyParser = require('body-parser')
const config = require('../config')
const express = require('express')
const logger = require('../logger')(module)
const namespace = require('express-namespace')
const Rx = require('rx')
const errorsHandler = require('./errors-handler')
const cors = require('cors')
const app = express()

/**
 * Define all middleware here.
 */
function defineMiddleware () {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(httpMethodWatcher)

  require('../auth/auth-init')()
  
  registerRouters()
  errorsHandler(app)
}

function httpMethodWatcher (req, res, next) {
  logger.info('%s -> "%s"', req.method, req.path)
  next()
}

/**
 * Register routers.
 */
function registerRouters () {
  app.options('*', cors())
  require('../auth').routing(app)
  require('../user').routing(app)
  require('../request').routing(app)
  require('../dictionary/dictionary-routing')(app)
}

module.exports = function (rootDir) {
  defineMiddleware()

  return {
    /**
     * Run server (info about host and port see config.json).
     *
     * @returns {Observable}
     */
    run: () => {
      return Rx.Observable.create(observer => {
        let port = config.get('server:port')
        let host = config.get('server:host')

        app.listen(port, host, () => {
          logger.info('The server running at "http://%s:%d/"', host, port)
          observer.onNext()
          observer.onCompleted()
        }).on('error', err => {
          logger.error(err)
          observer.onError(err)
        })
      })
    }
  }
}
