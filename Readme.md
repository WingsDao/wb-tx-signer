# Cosmos transaction signer

# How use

For first require the library

    const {Txs, build, factory} = require('tx-signer');

Now you can create transactions:

First way - create plain object with includes `type` property.

    const tx = build({
	    type: 'auth/StdTx',
	    ... other 'auth/StdTx' params
	    msg: [{
		    type: 'multisig/submit-call',
		    ... other 'multisig/submit-call' params
	    }]
    });

Second way - create an instance of the object using the factory.

    const tx = Txs.Auth.StdTx({
	    ...
	    msg: [{
		    Txs.Multisig.SubmitCall({...})
	    }]
    })

Or you can use both of these ways together:

    const tx = Txs.Auth.StdTx({
	    msg: [{
		    type: 'multisig/submit-call',
		    ...
	    }]
    })

## Sign transaction

To sign a transaction, you must first have access to the wallet.

    const wallet = new Wallet(...); // Create wallet
    const account = await api.getAccount(wallet.address); // Get account from API
    
    const tx = Txs.Auth.StdTx({ 
		chainId: 'wings-testnet',  
		gas: '200000',  
		memo: '',  
		account,
		msg: [{
			Txs.Multisig.SubmitCall({
				sender: account.address,
				uniqueId: 'test-unique-id',
				msg: Txs.Poa.AddValidator({
					address: "validator cosmos address",
					ethAddress: "Ethereum validator address",
					sender: account.address,
				})
			})
		}]
    });
    
    const signedTransaction = tx.sign(wallet); // Sign transaction
    
    // Sending transaction to blockchain
    api.broadcastTx(signedTransaction, 'block');

## Types of transaction

### auth/StdTx

Factory equivalent: `Txs.Auth.StdTx`

|    param       |type|                         |
|----------------|----|-------------------------------|
|`chainId`      | String |Cosmos chain id |
|`gas`|Numeric| Gas of transaction |
|`memo`|String| Memo |
|`msg`| BaseTx \| Array\<BaseTx> | Other messages |
|`account`|Object| User account |
|`account.address`|String|Cosmos address|
|`account.account_number`|Numeric||  
|`account.sequence`|Numeric||       
|`account.public_key`|Object||   
|`account.public_key.type`|String|Key type| 
|`account.public_key.value`|String|Base64 public key|

> `account` you can get from the cosmos blockchain.

### currencies/issue-currency

Factory equivalent: `Txs.Currencies.IssueCurrency`

|    param       |type|                         |
|----------------|----|-------------------------------|
|`amount`      | Numeric | |
|`decimals`|Numeric|  |
|`issueId`|String| |
|`recipient`| String |  |
|`symbol`|String|  |

### currencies/destroy-currency

Factory equivalent: `Txs.Currencies.DestroyCurrency`

|    param       |type|                         |
|----------------|----|-------------------------------|
|`amount`      | Numeric | |
|`chainId`|String|  |
|`spender`|String| |
|`recipient`| String |  |
|`symbol`|String|  |

### multisig/submit-call

Factory equivalent: `Txs.Multisig.SubmitCall`

|    param       |type|                         |
|----------------|----|-------------------------------|
|`sender`      | String | |
|`uniqueId`|String|  |
|`msg`|BaseTx | Submit message |

### multisig/confirm-call

Factory equivalent: `Txs.Multisig.ConfirmCall`

|    param       |type|                         |
|----------------|----|-------------------------------|
|`sender`      | String | |
|`msgId`|String|  |


TODO ...
