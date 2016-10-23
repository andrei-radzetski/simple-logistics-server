const express = require('express');
const Promise = require('promise');
const app = express();

/**
 * Private class.
 */
class Server {

    constructor() {
        this.host = config.get('server:host');
        this.port = config.get('server:port');
    }

    /**
     * Run server (info about host and port see config.json).
     * 
     * @returns { Promise }
     */
    run() {
        let _this = this;
        return new Promise((resolve) => {
            app.listen(_this.port, _this.host, () => {
                resolve([_this.host, _this.port]);
            });
        });
    }
}

module.exports = Server;