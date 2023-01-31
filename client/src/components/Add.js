import '../App.css';
import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx';
import { ethers } from 'ethers'
import ipfsHash from '../artifacts/contracts/Storage.sol/Storage.json'
import axios from 'axios'
import { creatDiplome, getDiplomes, deleteLastDiplome } from './diplomeService';
import Diplomes from './showDiplomes/Diplomes';



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



const deletDiplome = async () => {
    const transaction = await deleteLastDiplome();
    await transaction.wait();
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

const [show, setShow] = useState(false);
const [add, setAdd] = useState(false);
const [update, setUpdate] = useState(false);

    return (
        <div className="App">
            <div className='mb-5'>
                <nav className='navbar bg-dark shadow-lg'>
                    <div className='container-fluid'>
                        <a className='navbar-brand text-light' href="#">
                            Document Authentification
                        </a>
                        <div className='d-flex flex-row-reverse'>
                            <button type="button" className='btn btn-light mx-1' onClick={() => {setShow(!show); setAdd(false);setUpdate(false) }}>Show Diplomes</button>
                            <button type="button" className='btn btn-light mx-1' onClick={() => {setAdd(!add); setShow(false);setUpdate(false) }}>Add Diplomes</button>
                            <button type="button" className='btn btn-light mx-1' onClick={() => {setUpdate(!update); setAdd(false);show(false) }}>Update Diplome</button>
                        </div>
                    </div>
                </nav>
                <section className='jumpotron text-center p-5'>
                    <h1>Blockchain Document Authentification</h1>
                </section>
            </div>
            <div>
            {show && 
                <Diplomes
                    studentData={studentData}
                    setStudentData={setStudentData}
                />
            }
            </div>
            {add && 
                <div>
                    <h1>Add a File</h1>
                    <br/><br/>
                    <input
                            type="file"
                            onInput={(e) => handleFile(e)}
                    />
                    <div>
                    <br/><br/>
                        <button onClick={() => saveData()}>Save Data to Smart Contract</button>
                    </div>

                </div>

            }
        
        <div>
            <button onClick={() => deletDiplome()}>Delete Last Entry</button>
        </div>

        </div>
    );
}

export default App;
