const bodyParser = require('body-parser')
const config = require('../config')
const express = require('express')
const logger = require('../logger')(module)
const namespace = require('express-namespace')
const Rx = require('rx')
const app = express()

const RestUtil = require('../rest/rest-util')
const HttpError = require('../rest/error/http-error')
const HttpError404 = require('../rest/error/http-error-404')
const HttpError500 = require('../rest/error/http-error-500')

/**
 * Define all middleware here.
 */
function defineMiddleware () {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(httpMethodWatcher)

  require('../auth/auth-init')()

  registerRouters()
  app.use(handlePageNotFound)
  app.use(handleHttpError)
  app.use(handleError)
}

function httpMethodWatcher (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Origin', '*')
  logger.info('%s -> "%s"', req.method, req.path)
  next()
}

/**
 * Register routers.
 */
function registerRouters () {
  require('../auth').routing(app)
  require('../user').routing(app)
  require('../request').routing(app)
}

/**
 *
 */
function handlePageNotFound (req, res) {
  throw new HttpError404()
}

/**
 *
 */
function handleHttpError (err, req, res, next) {
  if (!(err instanceof HttpError) || err instanceof HttpError500) {
    return next(err)
  }

  let resJson = RestUtil.createResponseBoby(null, true, err.message)
  res.status(err.code).json(resJson)
}

/**
 *
 */
function handleError (err, req, res, next) {
  logger.error(err instanceof HttpError500 ? err.toString() : err)

  let resJson = RestUtil.createResponseBoby(null, true, 'Internal Server Error')
  res.status(500).json(resJson)
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
