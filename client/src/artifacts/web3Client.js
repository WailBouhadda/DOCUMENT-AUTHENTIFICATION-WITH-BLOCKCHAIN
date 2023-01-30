import contractAbi from './contracts/Storage.sol/Storage.json'

const ethers = require('ethers');



const provide = new ethers.providers.JsonRpcProvider('http://192.168.0.186:8545');

const privateKey = '0x3e3423ef6c78e6e2e507c340f68d487db1aa41d5f3dcbdd0789e14f84e344b2f';
let wallet ;
let contractAddress ;
let cnt ;
let isInitialzed = false;




export const init = async () => {

    const contractAdrees = "0x9F544a3Fc3D1045e6ec49D4ecEF6dCD700457165";
    
     wallet = new ethers.Wallet(privateKey, provide);
     cnt = new ethers.Contract(contractAdrees, contractAbi, wallet);
     console.log(isInitialzed)

    isInitialzed = false;
    console.log(isInitialzed)
}



export const executeTransaction = async (fnName, ...args) => {

  if(!isInitialzed){
    await init();
  }
 cnt[fnName](args)
  .then(transaction => {
    console.log(transaction);
    return transaction;
  })
  .catch(error => {
    console.error(error);
  });
}


export const call = async (fnName, ...args) => {

  if(!isInitialzed){
    await init();
  }
  const transaction = await cnt[fnName](...args);
  return transaction
}