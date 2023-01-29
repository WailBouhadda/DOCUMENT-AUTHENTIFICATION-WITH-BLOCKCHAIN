import '../App.css';
import './styles.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { ethers } from 'ethers'
import ipfsHash from '../artifacts/contracts/Storage.sol/Storage.json'
import Logo from './logo.png'

function App() {

    const cid = useParams();
    
    let codeapogee = cid.id;


    const [contract, setContract] = useState();


    const initConnection = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setContract(
            new ethers.Contract(
            "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
            ipfsHash.abi,
            signer
            )
        ) 
        } 

    
    useEffect(() => {
        initConnection()
    }, [])

    useEffect(() => {
        getStudent(codeapogee);
    });


//---------------------------------------------------------------------------------------------------------------


const [student, setStudent] = useState({})

const getStudent = async (_apogee) => {
    const transaction = await contract.getStudent(_apogee);
    //console.log(transaction)
    setStudent(transaction)
}



    return (
        <div className="App">

            <div className='div1'>
                <div className='div2'>
                <img src={Logo} alt="img" className='img'/><br/>
                <span style={{fontSize: '50px', fontWeight: 'bold'}}>Certificate of Completion</span>
                <br/><br/><br/><br/>
                <span style={{fontSize: '25px'}}><i>This is to certify that</i></span>
                <br/><br/>
                <span style={{fontSize: '30px'}}><b>{student.studentName}</b></span><br/><br/>
                <span style={{fontSize: '25px'}}><i>has completed the course</i></span><br/><br/>
                <span style={{fontSize: '30px'}}>{student.diplomeTitle}</span><br/><br/>
                <span style={{fontSize: '25px'}}><i>Date d'obtention</i></span><br/>le 03/03/2024 
                </div>
            </div>

        </div>
    );
}

export default App;
