import React from 'react';
import Faculties from './data'


const FacultiesSelect = () => {
    return (
        <div className="App">
            <select style={{width: 300}}>
            {Faculties.map((faculty, index) => (
                <option key={index} value={faculty.name}>
                {faculty.name}
                </option>
            ))}
            </select>    
        </div>
    );
};

export default FacultiesSelect;