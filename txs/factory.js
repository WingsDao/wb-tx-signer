'use strict';

const CALL_MAPPING = new Map();

function get(key) {
    if(!CALL_MAPPING.has(key)) {
        throw `Unrecognized method '${key}' in tx-signer`;
    }

    return CALL_MAPPING.get(key);
}

function build(obj) {
    return obj instanceof this ? obj : get(obj.type)(obj);
}

module.exports = exports = {
    register: CALL_MAPPING.set.bind(CALL_MAPPING),
    build,
    get
};
