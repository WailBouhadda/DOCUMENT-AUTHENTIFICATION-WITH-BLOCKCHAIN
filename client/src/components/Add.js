import '../App.css';
import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx';
import { ethers } from 'ethers'
import ipfsHash from '../artifacts/contracts/Storage.sol/Storage.json'
import axios from 'axios'
import { creatDiplome, getDiplomes, deleteLastDiplome } from './diplomeService';



const provide = new ethers.providers.JsonRpcProvider('http://192.168.0.186:8545');

const privateKey = '0x3e3423ef6c78e6e2e507c340f68d487db1aa41d5f3dcbdd0789e14f84e344b2f';
let wallet ;

let contractAddress ;

let cnt ;


function App() {

    const [account, setAccount] = useState("")
    const [contractIPFS, setContractIPFS] = useState()
    const [studentData, setStudentData] = useState([])

const initConnection = async () => {
    if(typeof window.ethereum !== 'undefined'){
        const accounts = await window.ethereum.request({ 
                            method: 'eth_requestAccounts' 
                        });
        //console.log(BesuAcc);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setAccount(accounts[0]);
        setContractIPFS(
            new ethers.Contract(
            "0x0d8cc4b8d15D4c3eF1d70af0071376fb26B5669b",
            ipfsHash,
            signer
            )
        ) 
        } else {
        console.log("Please install MetaMask");
        }


        wallet = new ethers.Wallet(privateKey, provide);

     contractAddress = '0x0d8cc4b8d15D4c3eF1d70af0071376fb26B5669b';

     cnt = new ethers.Contract(contractAddress, ipfsHash, wallet);
    }

    
    useEffect(() => {
        initConnection()
    }, [])


//---------------------------------------------------------------------------------------------------------------


const diplomes = async () => {
    const transaction = await getDiplomes();
    setStudentData(transaction);
    console.log("this is from BC")
    console.log(transaction[0])
}


const deletDiplome = async () => {
    const transaction = await deleteLastDiplome();
    await transaction.wait();
    diplomes()
}


//---------------------------------------------------------------------

const [data, setData] = useState([])

const handleFile = async (e) => {
    console.log('reading input file:');
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
    });
    console.log(jsonData);
    setData(jsonData);
}

//---------------------------------------------------------------------


const saveData = () => {
    for (let i = 0; i < data.length; i++) {
        let student = []
        for(let j = 0; j < data[i].length; j++){
            if(typeof data[i][j] === 'string'){
                student.push(data[i][j])
            }else{
                student.push(data[i][j].toString())
            }
        }

        creatDiplome(student)

        let emailData = {
            apogee : data[i][0],
            name : data[i][1],
            email : student[2]+'.'+student[3]+'-etu@etu.univh2c.ma',
            diplome : student[7]+' '+student[8]
        }

        axios.post('http://localhost:5000/email', emailData)
    }
}






    return (
        <div className="App">
        <br/><br/>
        <div>
        {account !== "" ? <p>Account Address : {account}</p> : <button className="big-button" onClick={() => initConnection()}>Connect</button>}
        </div>
        <h1>Add a File</h1>
        <div>

            <input
                    type="file"
                    onInput={(e) => handleFile(e)}
            />

        </div>

        
        <br/><br/>
        <hr/>
        <br/><br/>

        
        <div>
            <button onClick={() => diplomes()}>Get Data from Smart Contract</button>
        </div>
        <br/>
        <div>
            <button onClick={() => saveData()}>Save Data to Smart Contract</button>
        </div>
        <br/>
        <div>
            <button onClick={() => deletDiplome()}>Delete Last Entry</button>
        </div>

        <br/><br/>
        <hr/>
        <br/><br/>
        
        <div className="main-column">
            {studentData.map((item) => {
            return (
                <p key={item[0]}>{item[0]}, {item[1]}, {item[2]},{item[3]}, {item[4]}, {item[5]},{item[6]}, {item[7]}, {item[8]}, {item[0]}, {item[9]}, {item[11]} &nbsp;&nbsp;
                <a href={`/show/${item.codeApogee}`}><button>See {item.studentName}'s Diploma</button></a></p>)
            })}
        </div>




        <br/><br/>
        </div>
    );
}

export default App;
