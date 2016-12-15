const User = require('../user/user')
const Dictionary = require('../dictionary/dictionary')
const logger = require('../logger')(module)

function initUser() {
  let obj = new User({
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

  obj.save((err, user) => logger.info(user))

  obj = new User({
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

  obj.save((err, user) => logger.info(user))
}

function initLanguage() {
  let obj = new Dictionary({
    key: "en",
    value: "English",
    type: Dictionary.LANGUAGE
  })

  obj.save((err, dict) => logger.info(dict))

  obj = new Dictionary({
    key: "ru",
    value: "Русский",
    type: Dictionary.LANGUAGE
  })

  obj.save((err, dict) => logger.info(dict))
}

function initCountry() {
  let obj = new Dictionary({
    key: "by",
    value: "Belarus",
    type: Dictionary.COUNTRY
  })

  obj.save((err, dict) => logger.info(dict))

  obj = new Dictionary({
    key: "ru",
    value: "Russia",
    type: Dictionary.COUNTRY
  })

  obj.save((err, dict) => logger.info(dict))

  obj = new Dictionary({
    key: "pl",
    value: "Poland",
    type: Dictionary.COUNTRY
  })

  obj.save((err, dict) => logger.info(dict))

  obj = new Dictionary({
    key: "ua",
    value: "Ukraine",
    type: Dictionary.COUNTRY
  })

  obj.save((err, dict) => logger.info(dict))

  obj = new Dictionary({
    key: "lt",
    value: "Lithuania",
    type: Dictionary.COUNTRY
  })

  obj.save((err, dict) => logger.info(dict))

  obj = new Dictionary({
    key: "lv",
    value: "Latvia",
    type: Dictionary.COUNTRY
  })

  obj.save((err, dict) => logger.info(dict))
}

module.exports = function () {
  initUser()
  initLanguage()
  initCountry()
}