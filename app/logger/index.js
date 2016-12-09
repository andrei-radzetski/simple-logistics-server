const log4js = require('log4js')
const config = require('../config')

log4js.configure(config.get('log4js'))

/**
 * Get logger by module name, if module is undefined, logger name will be [default].
 *
 * @param module {Object} Module meta data.
 * @returns {Logger}
 */
module.exports = function (module) {
  let name = module ? module.filename : '[default]'
  let key = '/app/' /* application path */
  let keyIndex = name.indexOf(key)

  name = keyIndex !== -1 ? '[' + name.substr(keyIndex + 1) + ']' : name

  return log4js.getLogger(name)
}
