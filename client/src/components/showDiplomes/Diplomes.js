import React from 'react'
import { getDiplomes, filterDiplomes} from '../diplomeService';
import { useState } from 'react';

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
        console.log(date);
        const transaction = await filterDiplomes(date)
        setStudentData(transaction);
        console.log("this is from BC")
        console.log(transaction[0])
    }

  return (
    <div className='mb-5'>
        <form className='container p-3' onSubmit={handleSubmit}>
            <div className='mb-3 row'>
                <label htmlFor="exampleFormControlSelect1" className='col-sm-2 col-form-label'>Date :</label>
                <div className='col-sm-10'>
                    <select onChange={(e) => setDate(e.target.value)} required class="form-control" id="exampleFormControlSelect1">
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
            </div>
            
            <div className='d-flex justify-content-end'>
                <button type="submit" className='btn btn-dark '>Add</button>
            </div>
        </form>
         <div>
            <button onClick={() => diplomes()}>Get Data from Smart Contract</button>
        </div>
    </div>
  )
}

export default Diplomes