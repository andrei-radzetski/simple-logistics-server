
class User {

    constructor() {
        this._id = 1;
        this.email = 'test@test.ru';
        this.password = 'test';
    }

    comparePasswords(password) {
        return this.password === password;
    }

}

module.exports = User;