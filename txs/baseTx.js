'use strict';

const factory = require('./factory');

class BaseTx {
    static build(obj) {
        return factory.build.call(BaseTx, obj);
    };

    constructor() {}

    sign(wallet) {
        throw 'Not implemented sign method'
    }

    toObject() {
        throw 'Not implemented toObject method'
    }

    getSignObject() {
        throw 'Not implemented getSignObject method'
    }
}

module.exports = exports = BaseTx;
