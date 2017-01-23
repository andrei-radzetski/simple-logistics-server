const ctrl = require('./message-controller')
const Routing = require('../rest').Routing
const Route = require('../rest').Route

const namespase = '/messages'
const routes = [
  {
    method: Route.GET,
    path: '/',
    protection: '*',
    handler: (req, res, next) => ctrl.find(req, res, next)
  },
  {
    method: Route.GET,
    path: '/:id',
    protection: '*',
    handler: (req, res, next) => ctrl.findById(req, res, next)
  },
  {
    method: Route.POST,
    path: '/',
    protection: '*',
    handler: (req, res, next) => ctrl.create(req, res, next)
  },
  {
    method: Route.GET,
    path: '/box/in',
    protection: '*',
    handler: (req, res, next) => ctrl.inbox(req, res, next)
  },
  {
    method: Route.GET,
    path: '/box/out',
    protection: '*',
    handler: (req, res, next) => ctrl.outbox(req, res, next)
  },
  {
    method: Route.GET,
    path: '/box/read/:id',
    protection: '*',
    handler: (req, res, next) => ctrl.read(req, res, next)
  }

]

module.exports = (app) => {
  new Routing(app, namespase, routes).commit()
}
