const ctrl = require('./request-controller')
const Routing = require('../rest').Routing
const Route = require('../rest').Route

const namespase = '/requests'
const routes = [
  {
    method: Route.GET,
    path: '/',
    handler: (req, res, next) => ctrl.find(req, res, next)
  },

  {
    method: Route.GET,
    path: '/:id',
    handler: (req, res, next) => ctrl.findById(req, res, next)
  }
]

module.exports = (app) => {
  new Routing(app, namespase, routes).commit()
}
