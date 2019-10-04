'use strict';

const BaseTx = require('./../baseTx');

class DestroyCurrency extends BaseTx {
    constructor({amount, chainId, spender, recipient, symbol}) {
        super();

        Object.assign(this, {
            amount,
            chainId,
            spender,
            recipient,
            symbol
        });

        Object.freeze(this);
    }

    toObject() {
        const {amount, chainId, spender, recipient, symbol} = this;

        return {
            type: 'currencies/destroy-currency',
            value: {
                amount: amount.toString(),
                chainID: chainId,
                recipient: recipient,
                spender: spender,
                symbol: symbol,
            }
        }
    }

    getSignObject() {
        const {amount, chainId, spender, recipient, symbol} = this;

        return {
            amount: amount.toString(),
            chainID: chainId,
            recipient: recipient,
            spender: spender,
            symbol: symbol,
        }
    }
}

function create(params) {
    return new DestroyCurrency(params);
}

module.exports = exports = create;
