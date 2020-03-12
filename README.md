# stablecoin-api
Node module for interacting with stable coins, generating address, checking balance and making transfers.

## Install

```
$ npm install stablecoin-api
```

## API

#### Show Supported Coins
```js
const stablecoin = require('stablecoin-api');

(async () => {
  const address = await stablecoin.coins().
})();
```
```
- { name: "African Stable Coin", symbol: "ABCD" },
- { name: "Nigerian Naira Token", symbol: "NGNT" },
- { name: "USD Coin", symbol: "USDC" },
- { name: "Binance USD", symbol: "BUSD" }
```

#### Create Address 
```js
const stablecoin = require('stablecoin-api');

(async () => {
  const address = await stablecoin.createAddress("USDC") // USDC, BUSD, NGNT, ABCD.
  /*{
      address: '0x783d8e0EDFD86F61207B66b3e39F82D7d3bC2c71',
      privateKey: '0xff5455a312ab8fb5b7d9d8f3ee230b9f56115a90ed836f125bc3e0f70e759e9c',
      mnemonic: 'vehicle warm punch social cabin hair phrase route pipe violin become trip'
    }*/
})();
```

#### Balance
```js
const stablecoin = require('stablecoin-api');

(async () => {
  const address = await stablecoin.balance("bnb13lrs4k2utmlp46v7m72mt738n9yqs3cx56yvgz", "ABCD") // USDC, BUSD, NGNT, ABCD.
  // 0.50000000
})();
```

#### Transfer

`stablecoin.transfer(coin, to, amount, privateKey, from, memo)` 
`from` is only required for transactions on the Binance Chain (ABCD and BUSD). `memo` is only available on the Binance Chain. 
Response between the Ethereum chain is different from Binance Chain.

```js
const stablecoin = require('stablecoin-api');

(async () => {
  const address = await stablecoin.transfer("NGNT", "0x3c4fE580f594c14660260B495F059FFFe23068e6", 1, "0x05c0e5f83a378e4e326bd7******6603764d6e3364764caacacea24")

  /*{
    nonce: 4,
    gasPrice: BigNumber { _hex: '0x04c5c4768c' },
    gasLimit: BigNumber { _hex: '0xb8e0' },
    to: '0x05BBeD16620B352A7F889E23E3Cf427D1D379FFE',
    value: BigNumber { _hex: '0x00' },
    data: '0xa9059cbb0000000000000000000000003c4fe580f594c14660260b495f059fffe23068e60000000000000000000000000000000000000000000000000000000000000001',
    chainId: 1,
    v: 38,
    r: '0x4673d2287bff2af25ad0c937b35aa5bcfad37626ad3326b5e81dbc45d3708601',
    s: '0x2965d50bb3ea73b77e8e4b3f873ccfe52264179b116e076434ac75fb9b35482b',
    from: '0x184a7E5E279eb8452AB19D279b4C2145F823d814',
    hash: '0x27011a17de8f0de9cf3b312ee92c003e4470a92f6587b06a2a388859cc2af0ae',
    wait: [Function (anonymous)]
  }*/

  // https://etherscan.io/tx/0x27011a17de8f0de9cf3b312ee92c003e4470a92f6587b06a2a388859cc2af0ae

  const address = await stablecoin.transfer("ABCD", "bnb1ezu86szak2scj979wlk7g9uxg6vn53h40jt3pp", 0.1, "32530f04752b21476e45ccbd99d26a8a71ab01daa45f0e74101a51c5603dc79c", "bnb13lrs4k2utmlp46v7m72mt738n9yqs3cx56yvgz", "Some Memo")
  /*{
    result: [
      {
        code: 0,
        hash: 'C78FE00B3142A486056D6D2CEB4BBFC4139CC2604C340E79D68D327B08CB929C',
        log: 'Msg 0: ',
        ok: true
      }
    ],
    status: 200
  }*/
})();
```

#### Dependencies
- [Ethers.js] (https://github.com/ethers-io/ethers.js)
- [Binance-Chain] (https://github.com/binance-chain/javascript-sdk)

#### Contributing
1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request