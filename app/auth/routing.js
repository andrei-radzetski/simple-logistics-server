const passport = require('passport');
const ctrl = require('./controller');


module.exports = (app) => {
    app.namespace('/auth', () => {

        app.post('/login', ctrl.login);
        app.get('/logout', passport.protect(), ctrl.logout);

    });
}