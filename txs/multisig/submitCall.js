'use strict';

const BaseTx = require('./../baseTx');

class SubmitCall extends BaseTx {
    constructor({sender, uniqueId, msg}) {
        super();

        Object.assign(this, {
            sender,
            uniqueId,
            msg: SubmitCall.build(msg),
        });

        Object.freeze(this);
    }

    toObject() {
        const {msg, sender, uniqueId} = this;

        return {
            type: 'multisig/submit-call',
            value: {
                msg: msg.toObject(),
                sender: sender,
                uniqueID: uniqueId
            }
        }
    }

    getSignObject() {
        const {sender, uniqueId, msg} = this;

        return {
            msg: msg.getSignObject(),
            sender: sender,
            uniqueID: uniqueId
        };
    }
}

function create(params) {
    return new SubmitCall(params);
}

module.exports = exports = create;
