'use strict';

const factory = require('./txs/factory');
const Txs = require('./txs');

/**
 * Define initial commands
 */

// Standard transaction
factory.register('auth/StdTx', Txs.Auth.StdTx);

// Multisig calls
factory.register('multisig/confirm-call', Txs.Multisig.ConfirmCall);
factory.register('multisig/submit-call', Txs.Multisig.SubmitCall);

// Currencies calls
factory.register('currencies/issue-currency', Txs.Currencies.IssueCurrency);
factory.register('currencies/destroy-currency', Txs.Currencies.DestroyCurrency);

// Poa calls
factory.register('poa/add-validator', Txs.Poa.AddValidator);
factory.register('poa/remove-validator', Txs.Poa.RemoveValidator);
factory.register('poa/replace-validator', Txs.Poa.ReplaceValidator);

// Standard CosmosSdk calls
factory.register('cosmos-sdk/MsgSend', Txs.CosmosSdk.MsgSend);

// Templates for quick transaction creation
factory.register('templates/SendMoney', Txs.Templates.SendMoney);

/**
 * It is facade for building transaction
 * @param {Object || BaseTx} definition Object contains transaction definition or transaction object
 * @return {BaseTx} compiled transaction without signature
 */
function build(definition) {
    if(!definition.type && !(definition instanceof Txs.BaseTx)) {
        throw 'Invalid definition. Read the docs.'
    }

    return Txs.BaseTx.build(definition);
}

module.exports = exports = {
    factory,
    Txs,
    build
};
