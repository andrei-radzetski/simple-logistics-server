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
    email: "andrei.radzetski@gmail.com",
    phone: "375293333333",
    password: "admin",
    firstName: "Andrei",
    secondName: "Radzetski",
    country: "Belarus",
    city: "Grodno",
    language: "English",
    additionalInfo: "Some long log text, which describes the user. Max length is 500 symbols. This user is administrator of the platform.",
    confirmed: true,
    scope: 'admin'
  })

  admin.save((err, user) => logger.info(user))

  let user = new User({
    email: "svisloch.stels@gmail.com",
    phone: "375294444444",
    password: "user",
    firstName: "Ivan",
    secondName: "Ivanov",
    country: "Russia",
    city: "Moscow",
    language: "English",
    additionalInfo: "Some long log text, which describes the user. Max length is 500 symbols. This user is simple user of the platform.",
    confirmed: true,
    scope: 'user'
  })

  user.save((err, user) => logger.info(user))
}

