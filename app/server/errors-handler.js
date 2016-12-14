const logger = require('../logger')(module)
const RestUtil = require('../rest/rest-util')
const MongoErrors = require('mongo-errors')
const HttpError = require('../rest/error/http-error')
const HttpError404 = require('../rest/error/http-error-404')
const HttpError500 = require('../rest/error/http-error-500')
const ValidationError = require('../validation/validation-error')

module.exports = app => {

  /**
   * Handle page not found error.
   */
  app.use((req, res) => {
    throw new HttpError404()
  })

  /**
   * Handle ValidationError
   */
  app.use((err, req, res, next) => {
    if (!(err instanceof ValidationError)) {
      return next(err)
    }

    logger.warn(err.message)
    res.status(400).json(RestUtil.createErrorResBoby(err.message))
  })

  /**
   * Handle MongoError
   */
  app.use((err, req, res, next) => {
    if (err.name !== 'MongoError') {
      return next(err)
    }

    switch (err.code) {
      case MongoErrors.DuplicateKey:
        logger.error(err.message)
        return res.status(400)
          .json(RestUtil.createErrorResBoby('User with such parameters already exists.', err.code))

      default:
        logger.error('Unknown MongoError code: ' + err.code)
        return next(err)
    }
  })

  /**
   * Handle HttpError500
   */
  app.use((err, req, res, next) => {
    if (!(err instanceof HttpError500)) {
      return next(err)
    }

    logger.error(err.toString())
    res.status(err.code).json(RestUtil.createErrorResBoby(err.message))
  })

  /**
   * Handle HttpError
   */
  app.use((err, req, res, next) => {
    if (!(err instanceof HttpError)) {
      return next(err)
    }

    logger.warn(err.message)
    res.status(err.code).json(RestUtil.createErrorResBoby(err.message))
  })

  /**
   * Handle Error
   */
  app.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json(RestUtil.createErrorResBoby('Internal Server Error'))
  })

}