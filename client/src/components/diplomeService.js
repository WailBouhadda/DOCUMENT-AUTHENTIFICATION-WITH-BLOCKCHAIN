
import contractAbi from '../artifacts/contracts/Storage.sol/Storage.json'

const ethers = require('ethers');



const provide = new ethers.providers.JsonRpcProvider('http://192.168.230.72:8545');

const privateKey = '0x3e3423ef6c78e6e2e507c340f68d487db1aa41d5f3dcbdd0789e14f84e344b2f';
let wallet ;
let contractAddress ;
let cnt ;
let isInitialzed = false;




export const init = async () => {

    const contractAdrees = "0xcfeD223fAb2A41b5a5a5F9AaAe2D1e882cb6Fe2D";
    
     wallet = new ethers.Wallet(privateKey, provide);
     cnt = new ethers.Contract(contractAdrees, contractAbi, wallet);
     console.log(isInitialzed)

    isInitialzed = false;
    console.log(isInitialzed)
}


export const creatDiplome = async (diplome) => {

    if(!isInitialzed){
        await init();
      }
    const transaction = await cnt.createDiplome(diplome);
    await transaction.wait();
    return transaction;
}

export const getDiplomes = async () => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.getDiplomes();
      return transaction
}

export const filterDiplomes = async (date) => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.filterDiplomes(date);
      return transaction
}

export const deleteLastDiplome = async () => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.deleteLastDiplome();
      return transaction
}