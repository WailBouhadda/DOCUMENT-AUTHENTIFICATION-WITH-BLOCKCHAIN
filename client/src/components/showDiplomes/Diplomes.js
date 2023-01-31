import React from 'react'
import { getDiplomes, filterDiplomes} from '../diplomeService';
import { useState } from 'react';
import DiplomesTable from './DiplomesTable';

function Diplomes({studentData,setStudentData}) {

    const diplomes = async () => {
        const transaction = await getDiplomes();
        setStudentData(transaction);
        console.log("this is from BC")
        console.log(transaction[0])
    }

    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [etbliss, setEtabliss] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(date, title);
        const transaction = await filterDiplomes(date ,etbliss, title)
        setStudentData(transaction);
    }

  return (
    <div className='mb-5'>
        <form className='container p-3' onSubmit={handleSubmit}>
            <div className='mb-3 row'>
                <div className='col'>
                    <div className='mb-3 row'>
                        <label htmlFor="exampleFormControlSelect1" className='col-sm-2 col-form-label'>Date :</label>
                        <div className='col-sm-10'>
                            <select onChange={(e) => setDate(e.target.value)} required class="form-control" id="exampleFormControlSelect1">
                                <option selected="selected"></option>
                                <option value="2020">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='mb-3 row'>
                        <label htmlFor="exampleFormControlSelect1" className='col-sm-2 col-form-label'>Diplome :</label>
                        <div className='col-sm-10'>
                            <select onChange={(e) => setTitle(e.target.value)} required class="form-control" id="exampleFormControlSelect1">
                                <option selected="selected"></option>
                                <option value="MASTER">Master</option>
                                <option value="LICENCE">Licence</option>
                                <option value="DEUG">DEUG</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='mb-3 row'>
                        <label htmlFor="exampleFormControlSelect1" className='col-sm-2 col-form-label'>Diplome :</label>
                        <div className='col-sm-10'>
                            <select onChange={(e) => setEtabliss(e.target.value)} required class="form-control" id="exampleFormControlSelect1">
                                <option selected="selected"></option>
                                <option value="FSBM">FS Ben M'sik</option>
                                <option value="FSAC">FS Ain Chok</option>
                                <option value="FSTM">FST Mohemadia</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='d-flex justify-content-end xl-2'>
                 <button type="submit" className='btn btn-dark '>Chercher</button>
            </div>
        </form>
        <div className='mb-5'>
            <button onClick={() => diplomes()} className='btn btn-dark '>Afficher Tous</button>
        </div>
        <br></br>
        <DiplomesTable
            studentData={studentData}
            setStudentData={setStudentData}
        />
    </div>
  )
}

export default Diplomes