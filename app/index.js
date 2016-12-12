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

  let admin = new User({
    email: 'andrei.radzetski@gmail.com',
    phone: '375292669577',
    password: 'admin',
    firstName: 'Admin',
    secondName: 'Admin',
    confirmed: true,
    scope: 'admin'
  })

  admin.save((err, user) => logger.info(user))

  let user = new User({
    email: 'user@gmail.com',
    phone: '375291111111',
    password: 'user',
    firstName: 'User',
    secondName: 'User',
    confirmed: true,
    scope: 'user'
  })

  user.save((err, user) => logger.info(user))
}

