
import contractAbi from '../artifacts/contracts/Storage.sol/Storage.json'

const ethers = require('ethers');



const provide = new ethers.providers.JsonRpcProvider('http://192.168.254.72:8545');

const privateKey = '0x3e3423ef6c78e6e2e507c340f68d487db1aa41d5f3dcbdd0789e14f84e344b2f';
let wallet ;
let contractAddress ;
let cnt ;
let isInitialzed = false;




export const init = async () => {

    const contractAdrees = "0x4e71920b7330515faf5EA0c690f1aD06a85fB60c";
    
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
    const transaction = await cnt.createDiplome(diplome).wait();
    return transaction;
}

export const getDiplomes = async () => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.getDiplomes();
      return transaction
}

export const filterDiplomes = async (date , univers ,title) => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.filterDiplomes(date , univers ,title);
      return transaction
}

export const deleteLastDiplome = async () => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.deleteLastDiplome();
      return transaction
}