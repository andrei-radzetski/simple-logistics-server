const ctrl = require('./request-controller')
const Routing = require('../rest').Routing
const Route = require('../rest').Route

const namespase = '/request'
const routes = [
  {
    method: Route.GET,
    path: '/',
    protected: false,
    handler: (req, res, next) => ctrl.find(req, res, next)
  },

  {
    method: Route.GET,
    path: '/:id',
    protected: false,
    handler: (req, res, next) => ctrl.findById(req, res, next)
  }
]

module.exports = (app) => {
  new Routing(app, namespase, routes).commit()
}
