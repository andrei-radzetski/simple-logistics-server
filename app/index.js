const logger = require('./logger')(module);
let server = require('./server').server(__dirname);

server.run()
    .then((info) => {
        logger.info('The server running at "http://%s:%d/"', ...info);
    }).catch((err) => {
        logger.error(err);
    });