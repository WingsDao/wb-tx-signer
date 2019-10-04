'use strict';

const BaseTx = require('./../baseTx');

class AddValidator extends BaseTx {
    constructor({address, ethAddress, sender}) {
        super();

        Object.assign(this, {
            address,
            ethAddress,
            sender,
        });

        Object.freeze(this);
    }

    toObject() {
        const {address, ethAddress, sender} = this;

        return {
            type: 'poa/add-validator',
            value: {
                address: address,
                eth_address:ethAddress,
                sender: sender,
            }
        }
    }

    getSignObject() {
        const {address, ethAddress, sender} = this;

        return {
            address: address,
            eth_address:ethAddress,
            sender: sender,
        }
    }
}

function create(params) {
    return new AddValidator(params);
}

module.exports = exports = create;
