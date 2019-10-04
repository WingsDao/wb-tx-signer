'use strict';

const BaseTx = require('./../baseTx');
const {sortObject} = require('../../utils');

class StdTx extends BaseTx {
    constructor({gas, memo, account, msg, chainId}) {
        super();
        const msgs = !Array.isArray(msg) ? [msg] : msg;

        Object.assign(this, {
            msgs: msgs.map(msg => StdTx.build(msg)),
            gas,
            memo,
            account,
            chainId,
        });

        Object.freeze(this);
    }

    toObject() {
        const {gas, memo, msgs} = this;

        return {
            type: 'auth/StdTx',
            msg: msgs.map(msg => msg.toObject()),
            memo,
            fee: {
                amount: [],
                gas: gas.toString(),
            },
        };
    }

    getSignObject() {
        const {account, chainId, msgs, gas, memo} = this;

        return {
            account_number: account.accountNumber || account.account_number,
            chain_id: chainId,
            fee: {
                amount: [],
                gas: gas.toString(),
            },
            memo,
            msgs: msgs.map(msg => msg.getSignObject()),
            sequence: account.sequence
        };
    }

    sign(wallet) {
        const obj = this.toObject();
        const {account} = this;

        const signObject = sortObject(this.getSignObject());

        obj.signatures = [{
            account_number: account.accountNumber || account.account_number,
            pub_key: account.publicKey || account.public_key,
            sequence:  account.sequence,
            signature: wallet.sign(signObject).toString('base64'),
        }];

        return obj;
    }
}

function create(params) {
    return new StdTx(params);
}

module.exports = exports = create;
