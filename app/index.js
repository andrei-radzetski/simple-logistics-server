const logger = require('./logger')(module)
const db = require('./store').db
const server = require('./server').server(__dirname)
const init = require('./server/init')

db.connect()
  .flatMap(() => server.run())
  .subscribe(
    () => {},
    err => logger.error(err),
    () => logger.info('System was started.') /* init() */ )