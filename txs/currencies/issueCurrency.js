'use strict';

const BaseTx = require('./../baseTx');

class IssueCurrency extends BaseTx {
    constructor({amount, decimals, issueId, recipient, symbol}) {
        super();

        Object.assign(this, {
            amount,
            decimals,
            issueId,
            recipient,
            symbol
        });

        Object.freeze(this);
    }

    toObject() {
        const {amount, decimals, issueId, recipient, symbol} = this;

        return {
            type: 'currencies/issue-currency',
            value: {
                amount: amount.toString(),
                decimals: parseInt(decimals),
                issueID: issueId,
                recipient: recipient,
                symbol: symbol.toLowerCase(),
            }
        }
    }

    getSignObject() {
        const {amount, decimals, issueId, recipient, symbol} = this;

        return {
            amount: amount.toString(),
            decimals: parseInt(decimals),
            issueID: issueId,
            recipient: recipient,
            symbol: symbol.toLowerCase(),
        }
    }
}

function create(params) {
    return new IssueCurrency(params);
}

module.exports = exports = create;
