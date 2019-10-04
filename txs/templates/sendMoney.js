'use strict';

const BaseTx = require('./../baseTx');

class SendMoney extends BaseTx {
    constructor({send, to, account, chainId, gas, memo}) {
        super();

        const tx = SendMoney.build({
            type: 'auth/StdTx',
            chainId,
            memo,
            gas,
            account,
            msg: {
                type: 'cosmos-sdk/MsgSend',
                send,
                to,
                from: account.address
            }
        });

        Object.assign(this, {
            tx
        });

        Object.freeze(this);
    }

    toObject() {
        return this.tx.toObject();
    }

    getSignObject() {
        return this.tx.getSignObject();
    }

    sign(wallet) {
        return this.tx.sign(wallet);
    }
}

function create(params) {
    return new SendMoney(params);
}

module.exports = exports = create;
