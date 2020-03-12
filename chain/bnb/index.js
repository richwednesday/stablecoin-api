const BncClient = require('@binance-chain/javascript-sdk');
const client = new BncClient('https://dex.binance.org');
const abcd = require("../../coins/abcd/index")
const busd = require("../../coins/busd/index")

client.chooseNetwork("mainnet")

module.exports = {
  async createAddress() {
    try
    {
      let res = await client.createAccountWithMneomnic();
      return res;
    }
    catch (error)
    {
      console.log(error)
    }
  },

  async balance(address, coin) {
    try
    {
      let res = await client.getBalance(address);
      
      let bal;
      if (coin === "ABCD") bal = res.find(v => v.symbol === abcd.symbol)
      else if (coin === "BUSD") bal = res.find(v => v.symbol === busd.symbol)
      else return res;

      bal = bal ? bal.free : 0;
      return bal;
    }
    catch (error)
    {
      console.log(error)
      return error;
    }
  },

  async transfer(from, to, amount, privateKey, coin, memo) {
    try {
      if (!from || !to || !amount || !privateKey)
        throw "Missing Arguments";
        
      await client.setPrivateKey(privateKey)

      await client.initChain();

      let asset;
      if (coin === "ABCD") asset = abcd.symbol;
      else if (coin === "BUSD") asset = busd.symbol;
      else
        throw "Invalid Coin passed";
      let c = await client.transfer(from, to, amount, asset, memo)
      return c;
    }
    catch (error)
    {
      console.log(error)
      return error;
    }
  }
}
