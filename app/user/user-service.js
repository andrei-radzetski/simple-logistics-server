const AbstractService = require('../store').AbstractService

class UserService extends AbstractService {

}

let instance = new UserService()
module.exports = instance

/*
indById: (id) =>
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
*/
