const passport = require('passport');
const ctrl = require('./controller');


module.exports = (app) => {
    app.namespace('/users', () => {

        app.get('/', passport.protect(), ctrl.getAll);
        app.get('/:id', passport.protect(), ctrl.getById);

    });
}