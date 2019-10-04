'use strict';

const BaseTx = require('./../baseTx');

class MsgSend extends BaseTx {
    constructor({send, from, to}) {
        super();

        const amount = Array.isArray(send) ? send : [send];

        for(let i = 0; i < amount.length; i++) {
            let item = amount[i];

            if(item.amount === undefined || item.denom === undefined) {
                throw "Invalid param 'amount' or 'denom'";
            }

            item.denom = item.denom.toString().toLocaleLowerCase();
            item.amount = item.amount.toString();
        }

        Object.assign(this, {
            amount,
            from,
            to,
        });

        Object.freeze(this);
    }

    toObject() {
        const {amount, from, to} = this;

        return {
            type: 'cosmos-sdk/MsgSend',
            value: {
                amount,
                from_address: from,
                to_address: to,
            }
        }
    }

    getSignObject() {
        return this.toObject();
    }
}

function create(params) {
    return new MsgSend(params);
}

module.exports = exports = create;
