const bodyParser = require('body-parser')
const config = require('../config')
const express = require('express')
const logger = require('../logger')(module)
const namespace = require('express-namespace')
const Rx = require('rx')
const app = express()

/**
 * Register routers.
 */
function _registerRouters () {
  require('../auth').routing(app)
  require('../user').routing(app)
  require('../request').routing(app)
}

/**
 * Define all middleware here.
 */
function _defineMiddleware () {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(_watcher)

  require('../auth/auth-init')()

  _registerRouters()
}

function _watcher (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Origin', '*')
  logger.info('%s -> "%s"', req.method, req.path)
  next()
}

module.exports = function (rootDir) {
  _defineMiddleware()

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
