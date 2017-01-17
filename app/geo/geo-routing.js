const ctrl = require('./geo-controller')
const Routing = require('../rest').Routing
const Route = require('../rest').Route

const namespase = '/geo'
const routes = [
  {
    method: Route.GET,
    path: '/:name',
    protection: '*',
    handler: (req, res, next) => ctrl.find(req, res, next)
  }
]

module.exports = (app) => {
  new Routing(app, namespase, routes).commit()
}