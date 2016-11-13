const User = require('./user');
const Promise = require('promise');

module.exports = {
    
    findById: (id) => 
        new Promise((resolve, reject) => {
            if(id == 1) {
                resolve(new User());
            } else {
                reject();
            }
    }),

    findByLogin: (login) => 
        new Promise((resolve, reject) => {
            if(login == 'test@test.ru') {
                resolve(new User());
            } else {
                reject();
            }
    })
};