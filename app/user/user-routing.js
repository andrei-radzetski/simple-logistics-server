const ctrl = require('./user-controller')
const Routing = require('../rest').Routing
const Route = require('../rest').Route

const namespase = '/users'
const routes = [
  {
    method: Route.GET,
    path: '/profile',
    straight: true,
    protection: '*',
    handler: (req, res, next) => ctrl.profile(req, res, next)
  },
  {
    method: Route.POST,
    path: '/profile',
    straight: true,
    handler: (req, res, next) => ctrl.createProfile(req, res, next)
  },
  {
    method: Route.PUT,
    path: '/profile',
    straight: true,
    protection: '*',
    handler: (req, res, next) => ctrl.updateProfile(req, res, next)
  },
  {
    method: Route.GET,
    path: '/',
    handler: (req, res, next) => ctrl.find(req, res, next)
  },
  {
    method: Route.GET,
    path: '/filter',
    handler: (req, res, next) => ctrl.filter(req, res, next)
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
    protection: 'admin',
    handler: (req, res, next) => ctrl.create(req, res, next)
  },
  {
    method: Route.PUT,
    path: '/:id',
    protection: 'admin',
    handler: (req, res, next) => ctrl.update(req, res, next)
  }
]

module.exports = (app) => {
  new Routing(app, namespase, routes).commit()
}
