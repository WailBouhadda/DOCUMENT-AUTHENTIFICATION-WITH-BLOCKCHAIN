import './App.css';
import Form from 'react-bootstrap/Form';
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '../data/data.js'

function Email() {

    const [niveau, setNiveau] = useState('');
    const [filiere, setFiliere] = useState('');



    return (
        <div className="App">
        <Form.Select aria-label="Niveau" value={niveau} onChange={(e) => {setNiveau(e.target.value);}}>
            <option value="master">Master</option>
            <option value="licence">Licence</option>
        </Form.Select>
        <Form.Select aria-label="Niveau" value={filiere} onChange={(e) => {setFiliere(e.target.value);}}>
            {data.filter((val) => {
                return val.niveau.toLowerCase() === niveau
            }).map((element) => (        
                    <option key={element.Filiere} value={element.Filiere}>{element.Filiere}</option>
            ))}
        </Form.Select>
        
        <input type="submit" onClick={() => console.log(niveau+' : '+filiere)}/>

        </div>
    );
}

export default Email;
