const logger = require('./logger')(module);
const server = require('./server').instance;

server.run()
    .then((info) => {
        logger.info('The server running at "http://%s:%d/"', ...info);
    }).catch((err) => {
        logger.error(err);
    });