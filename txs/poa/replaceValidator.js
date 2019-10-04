'use strict';

const BaseTx = require('./../baseTx');

class ReplaceValidator extends BaseTx {
    constructor({ethAddress, newAddress, oldAddress, sender}) {
        super();

        Object.assign(this, {
            newAddress,
            ethAddress,
            oldAddress,
            sender
        });

        Object.freeze(this);
    }

    toObject() {
        const {ethAddress, newAddress, oldAddress, sender} = this;

        return {
            type: 'poa/replace-validator',
            value: {
                eth_address: ethAddress,
                new_validator: newAddress,
                old_address: oldAddress,
                sender: sender,
            }
        }
    }

    getSignObject() {
        const {ethAddress, newAddress, oldAddress, sender} = this;

        return {
            eth_address: ethAddress,
            new_validator: newAddress,
            old_address: oldAddress,
            sender: sender,
        }
    }
}

function create(params) {
    return new ReplaceValidator(params);
}

module.exports = exports = create;
