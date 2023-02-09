
import contractAbi from '../artifacts/contracts/Storage.sol/Storage.json'

const ethers = require('ethers');



const provide = new ethers.providers.JsonRpcProvider('http://192.168.112.72:8546');

const privateKey = '0x3e3423ef6c78e6e2e507c340f68d487db1aa41d5f3dcbdd0789e14f84e344b2f';
let wallet ;
let cnt ;
let isInitialzed = false;




export const init = async () => {

    const contractAdrees = "0x42699A7612A82f1d9C36148af9C77354759b210b";
    
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
    const transaction = await cnt.createDiplome(diplome)
    await transaction.wait()
    return transaction
}

export const getDiplomes = async () => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.getDiplomes();
      return transaction
}

export const getDiplome = async (cne, diplome) => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.getDiplome(cne, diplome);
      return transaction
}

export const updateDiplome = async (cne, diplome) => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.updateDiplome(cne, diplome);
      return transaction
}

export const updateDiplomes = async (diplome) => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.updateDiplomes(diplome)
      await transaction.wait()
      return transaction
}

export const deleteLastDiplome = async () => {

    if(!isInitialzed){
        await init();
      }
      const transaction = await cnt.deleteLastDiplome();
      return transaction
}