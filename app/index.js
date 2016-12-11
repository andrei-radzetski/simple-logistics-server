const logger = require('./logger')(module)
const db = require('./store').db
const server = require('./server').server(__dirname)

db.connect()
  .flatMap(() => server.run())
  .subscribe(
    () => {},
    err => logger.error(err),
    () => logger.info('System was started.'))

// TODO: remove
function init () {
  const User = require('./user/user')
  let user = new User({
    email: 'andrei.radzetski@gmail.com',
    phone: '375292669577',
    password: 'admin',
    firstName: 'Admin',
    secondName: 'Admin',
    confirmed: true,
    scope: 'admin'
  })
  user.save((err, user) => logger.info(user))
}

