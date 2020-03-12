const ethers = require('ethers');
const ngnt = require('../../coins/ngnt/index')
const usdc = require('../../coins/usdc/index')

const provider = ethers.getDefaultProvider();
const ngntContract = new ethers.Contract(ngnt.contractAddress, ngnt.abi, provider);
const usdcContract = new ethers.Contract(usdc.contractAddress, usdc.abi, provider);  

module.exports = {
  async createAddress() {
    try
    {
      let randomWallet = ethers.Wallet.createRandom();
      
      return { 
        address: randomWallet.address,
        privateKey: randomWallet.privateKey,
        mnemonic: randomWallet.mnemonic
      };
    }
    catch (err)
    {
      console.log(err)
      return err;
    }
  },

  async balance(address, coin) {
    if (!coin)
      throw "Select either NGNT or USDC as your coin to query."
    let contract = getContract(coin);

    try {
      let res = await contract.balanceOf(address)
      
      return res.toString(); 
    }
    catch (err)
    {
      console.log(err)
      return err;
    }
  },

  async transfer(to, amount, privateKey, coin) {
    if (!coin || !privateKey || !amount || !to)
      throw "Missing Arguments";

    let contract = getContract(coin);

    try {
      let wallet = new ethers.Wallet(privateKey, provider);
      let contractWithSigner = contract.connect(wallet);

      let tx = await contractWithSigner.transfer(to, amount);

      return tx;
    }
    catch (err)
    {
      console.log(err)
      return err;
    }
  }
}

function getContract(coin) {
  if (coin === "NGNT") return ngntContract;
  else if (coin === "USDC") return usdcContract;
  else 
    throw "Invalid Coin Passed";
}


