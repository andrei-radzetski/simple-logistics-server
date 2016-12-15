const ctrl = require('./dictionary-controller')
const Routing = require('../rest').Routing
const Route = require('../rest').Route

const namespase = '/dictionaries'
const routes = [
  {
    method: Route.GET,
    path: '/',
    protection: 'admin',
    handler: (req, res, next) => ctrl.find(req, res, next)
  },
  {
    method: Route.GET,
    path: '/languages',
    handler: (req, res, next) => ctrl.languages(req, res, next)
  },
  {
    method: Route.GET,
    path: '/countries',
    handler: (req, res, next) => ctrl.countries(req, res, next)
  }
]

module.exports = (app) => {
  new Routing(app, namespase, routes).commit()
}
