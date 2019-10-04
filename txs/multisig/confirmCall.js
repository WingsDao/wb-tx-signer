'use strict';

const BaseTx = require('./../baseTx');

class ConfirmCall extends BaseTx {
    constructor({msgId, sender}) {
        super();

        Object.assign(this, {
            msgId,
            sender
        });

        Object.freeze(this);
    }

    toObject() {
        const {msgId, sender} = this;

        return {
            type: 'multisig/confirm-call',
            value: {
                msg_id: msgId,
                sender: sender,
            },
        };
    }

    getSignObject() {
        const {msgId, sender} = this;

        return {
            msg_id: msgId,
            sender: sender,
        };
    }
}

function create(params) {
    return new ConfirmCall(params);
}

module.exports = exports = create;
