const ctrl = require('./auth-controller')
const Routing = require('../rest').Routing
const Route = require('../rest').Route

const namespase = '/auth'
const routes = [
  {
    method: Route.POST,
    path: '/login',
    protected: false,
    handler: (req, res, next) => ctrl.login(req, res, next)
  },

  {
    method: Route.GET,
    path: '/logout',
    protected: true,
    handler: (req, res, next) => ctrl.logout(req, res, next)
  }
]

module.exports = (app) => {
  new Routing(app, namespase, routes).commit()
}
