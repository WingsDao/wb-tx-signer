'use strict';

const BaseTx = require('./../baseTx');

class RemoveValidator extends BaseTx {
    constructor({address, sender}) {
        super();

        Object.assign(this, {
            address,
            sender
        });

        Object.freeze(this);
    }

    toObject() {
        const {address, sender} = this;

        return {
            type: 'poa/remove-validator',
            value: {
                address,
                sender: sender,
            }
        }
    }

    getSignObject() {
        const {address, sender} = this;

        return {
            address,
            sender: sender,
        }
    }
}

function create(params) {
    return new RemoveValidator(params);
}

module.exports = exports = create;
