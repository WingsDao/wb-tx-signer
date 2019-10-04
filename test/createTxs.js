'use strict';

require('dotenv').config({path: '../.env'});

const {describe, it, before, beforeEach} = require('mocha');
const {should} = require('chai');
should();

const Wallet = require('../../../wb/utils/wallet');
const {Txs, build} = require('../index');

const TEST_MNEMONIC = 'enroll initial thing insect eager inspire city abstract brisk icon lens claw journey grain end arrange welcome august insect trumpet pen alley name chaos';
const TEST_MNEMONIC_PATH = "44'/118'/0'/0/0";

const wallet = new Wallet(TEST_MNEMONIC, TEST_MNEMONIC_PATH);

const account = {
    address: wallet.address,
    account_number: '0',
    public_key: {
        type: 'tendermint/PubKeySecp256k1',
        value: wallet.publicKey.toString('base64')
    },
    sequence: "1",
};

const AUTH_STD_BASE = {
    type: 'auth/StdTx',
    chainId: 'wings-testnet',
    gas: '200000',
    memo: '',
    account,
};

const AUTH_STD_BASE_SIGN = { account_number: '0',
    chain_id: AUTH_STD_BASE.chainId,
    fee: {
        amount: [],
        gas: AUTH_STD_BASE.gas.toString()
    },
    memo: AUTH_STD_BASE.memo,
    sequence: account.sequence.toString()
};


Object.freeze(AUTH_STD_BASE);

describe('Create transactions with use plain object', () => {
    it('should create simple transaction', () => {
        const def = {
            ...AUTH_STD_BASE,
            msg: [],
        };

        const tx = build(def);

        tx.toObject().should.to.eql({
            type: 'auth/StdTx',
            msg: [],
            memo: '',
            fee: {
                amount: [],
                gas: '200000'
            }
        });

        tx.getSignObject().should.to.eql({
            ...AUTH_STD_BASE_SIGN,
            msgs: [],
        });
    });

    it('should create complex transaction', () => {
        const def = {
            ...AUTH_STD_BASE,
            msg: [{
                type: 'multisig/confirm-call',
                msgId: 1,
                sender: account.address,
            }],
        };

        const tx = build(def);

        tx.toObject().should.to.eql({
            type: 'auth/StdTx',
            msg: [{
                type: 'multisig/confirm-call',
                value: {
                    msg_id: 1,
                    sender: account.address,
                }
            }],
            memo: '',
            fee: {
                amount: [],
                gas: '200000'
            }
        });

        tx.getSignObject().should.to.eql({
            ...AUTH_STD_BASE_SIGN,
            msgs: [{
                msg_id: 1,
                sender: account.address,
            }],
        });
    })
});

describe('Create transactions with use object instances', () => {
    it('should create simple transaction', () => {
        const def = Txs.Auth.StdTx({
            ...AUTH_STD_BASE,
            msg: [],
        });

        const tx = build(def);

        tx.toObject().should.to.eql({
            type: 'auth/StdTx',
            msg: [],
            memo: '',
            fee: {
                amount: [],
                gas: '200000'
            }
        });

        tx.getSignObject().should.to.eql({
            ...AUTH_STD_BASE_SIGN,
            msgs: [],
        });
    });

    it('should create complex transaction', () => {
        const def = Txs.Auth.StdTx({
            ...AUTH_STD_BASE,
            msg: [
                Txs.Multisig.ConfirmCall({
                    msgId: 1,
                    sender: account.address,
                })
            ],
        });

        const tx = build(def);

        tx.toObject().should.to.eql({
            type: 'auth/StdTx',
            msg: [{
                type: 'multisig/confirm-call',
                value: {
                    msg_id: 1,
                    sender: account.address,
                }
            }],
            memo: '',
            fee: {
                amount: [],
                gas: '200000'
            }
        });

        tx.getSignObject().should.to.eql({
            ...AUTH_STD_BASE_SIGN,
            msgs: [{
                msg_id: 1,
                sender: account.address,
            }],
        });
    })
});

describe('Compare Signatures', () => {
    it('should correct signature', () => {
        const def = Txs.Auth.StdTx({
            ...AUTH_STD_BASE,
            msg: [
                Txs.Multisig.ConfirmCall({
                    msgId: 1,
                    sender: account.address,
                })
            ],
        });

        const tx = def.sign(wallet);

        const expectSignature = "CTGbrBmMko/y+jLNmB0ykp8G/r8M+CKMeGcrMaHLbQdlJHSb+Q6fpCyrzB3LFf0v4xp3X6FPX1v+dVmdVjsb3Q==";

        tx.signatures[0].signature.should.be.equal(expectSignature);
    })
});
