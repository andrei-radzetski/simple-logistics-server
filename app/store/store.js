const config = require('../config')
const mongoose = require('mongoose')
const Database = require('./database')

let db = new Database(
    mongoose,
    config.get('db:uri'),
    config.get('db:options')
)

module.exports = db

