const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Promise = require('promise');
const namespace = require('express-namespace');
const session = require('express-session')
const app = express();


/**
 * Register routers.
 */
function _registerRouters() {
    require('../auth').routing(app);
    require('../users').routing(app);
}


/**
 * Define all middleware here.
 */
function _defineMiddleware() {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(_watcher);

    // register passportjs
    require('../auth').auth(app);

    app.use(session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    _registerRouters();
}


function _watcher(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('METHOD "%s", URL "%s"', req.method, req.path);
    next();
}


module.exports = function(rootDir) {

    _defineMiddleware();

    return {
        /**
         * Run server (info about host and port see config.json).
         * 
         * @returns { Promise }
         */
        run: () => {
            return new Promise((resolve) => {
                app.listen(config.get('server:port'), config.get('server:host'), () => {
                    resolve([config.get('server:host'), config.get('server:port')]);
                });
            });
        }
    };
};