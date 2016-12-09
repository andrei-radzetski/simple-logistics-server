const nconf = require('nconf')
const path = require('path')

/*
 * Configure nconf
 */
nconf.argv()
    .env() // read from environment
    .file({ file: path.join(__dirname, 'config.json') }) // read from file

module.exports = nconf
