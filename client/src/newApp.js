import './App.css';
import * as XLSX from 'xlsx';
import { useState } from 'react';


function App() {

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

    //console.log(e.target.files[0]);
    //console.log(workbook);
    console.log(jsonData);
    setData(jsonData);
}


  return (
    <div className="App">
      <input
          type="file"
          onInput={(e) => handleFile(e)}
      />

      <h4>{data}</h4>
    </div>
  );
}

export default App;