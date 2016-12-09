const logger = require('./logger')(module)
const db = require('./store').db
const server = require('./server').server(__dirname)

db.connect()
    .flatMap(() => server.run())
    .subscribe(
        () => {},
        err => logger.error(err),
        () => logger.info('System was started.')
    )
