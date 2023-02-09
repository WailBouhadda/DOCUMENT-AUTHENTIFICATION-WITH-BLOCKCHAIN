import {Link, Outlet} from 'react-router-dom';
import '../App.css';
import { useState, useEffect } from 'react'
import logo from "../assets/logo.png"

function NavBar() {

    const [account, setAccount] = useState("")

    const initConnection = async () => {
        if(typeof window.ethereum !== 'undefined'){
            const accounts = await window.ethereum.request({ 
                                method: 'eth_requestAccounts' 
                            });
            setAccount(accounts[0]);
            } else {
                console.log("Please install MetaMask");
            }
        }
        
        useEffect(() => {
            initConnection()
        }, [])

        // segmentation representation des images sous form des graph

    return (
        <nav className="sticky top-0 z-10 shadow-sm bg-opacity-80 backdrop-filter backdrop-blur-lg w-full m-auto overflow-hidden">
        <div className="max-w-full px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl text-gray-900 font-semibold">
              <Link to='/'><img src={logo} className="w-[150px] "/></Link>
            </span>
            <div className="flex space-x-4 text-gray-900">
              <Link to={"/list"}>
                <div className='no-underline'>
                    <a className='p-1 text-cyan-400 font-medium hover:text-cyan-200 !no-underline'>Show Diplomes</a>
                </div>
                </Link>
              <Link to={"/update"}><a className='p-1 text-cyan-400 font-medium hover:text-cyan-200 !no-underline'>Update Diplome</a></Link>
              <Link to={"/Add"}><a styleclassName='p-1 text-cyan-400 font-medium hover:text-cyan-200 !no-underline'>Add Diplomes</a></Link>
            </div>
          </div>
        </div>
        {/* <Outlet/> */}
      </nav>
    //     <nav className='navbar bg-dark shadow-lg'>
    //     <div className='container-fluid'>
    //         <a className='navbar-brand text-light' href="/">
    //             Document Authentification
    //         </a>
    //         <div className='d-flex flex-row-reverse'>
    //             <Link to="/list"><button type="button" className='btn btn-dark mx-1'>Show Diplomes</button></Link>
    //             <Link to="/update"><button type="button" className='btn btn-dark mx-1'>Update Diplome</button></Link>
    //             <Link to="/"><button type="button" className='btn btn-dark mx-1'>Add Diplomes</button></Link>
    //         </div>
    //     </div>
    // </nav>
    );
}

export default NavBar;