const logger = require('./logger')(module)
const db = require('./store').db
const server = require('./server').server(__dirname)

db.connect()
  .flatMap(() => server.run())
  .subscribe(
    () => {},
    err => logger.error(err),
    () => logger.info('System was started.'))

/*
const User = require('./user').User
let user = new User({
email: 'admin@sl.by',
phone: '+375292669577',
password: 'admin',
firstName: 'Admin',
secondName: 'Admin',
confirmed: true
})
user.save((err, product, numAffected) => console.log(arguments))
*/
