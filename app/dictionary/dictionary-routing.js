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
    path: '/filter',
    protection: 'admin',
    handler: (req, res, next) => ctrl.filter(req, res, next)
  },
  {
    method: Route.GET,
    path: '/types',
    protection: 'admin',
    handler: (req, res, next) => ctrl.types(req, res, next)
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
  },
  {
    method: Route.GET,
    path: '/request/kinds',
    handler: (req, res, next) => ctrl.requestKinds(req, res, next)
  },
  {
    method: Route.GET,
    path: '/request/servives',
    handler: (req, res, next) => ctrl.requestServices(req, res, next)
  },
  {
    method: Route.GET,
    path: '/transports',
    handler: (req, res, next) => ctrl.trasports(req, res, next)
  }
]

module.exports = (app) => {
  new Routing(app, namespase, routes).commit()
}
