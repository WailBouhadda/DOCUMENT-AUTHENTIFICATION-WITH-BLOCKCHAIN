import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import {
  init,
  updateDiplomes,
  updateDiplome,
} from "../web3Service/diplomeService";
import { Input, TextField } from "@mui/material";
import { Button } from "@mui/material";
import NavBar from "../Navbar/Navbar";

function Update() {
  const [contract, setContract] = useState();
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const [apogee, setApogee] = useState("");

  const update1 = async (cne, diplome) => {
    const transaction = await updateDiplome(cne, diplome);
    console.log(transaction);
    setStudentData(transaction);
  };

  const update2 = async (diplome) => {
    const transaction = await updateDiplomes(diplome);
    await transaction.wait();
    console.log(transaction);
  };

  // one
  const updateElem = async () => {
    let diplome = [];
    for (let j = 0; j < data[0].length; j++) {
      diplome.push(data[0][j].toString());
    }
    await update1(apogee, diplome);

    // let eml = diplome[1].toLowerCase().split(" ");
    // eml = eml.join(".");
    // Update : cne fullName cni email birthDay placedate mention univ degree filiere  date
    let emailData = {
      CNE: diplome[0],
      name: diplome[1],
      // email: eml + "-etu@etu.univh2c.ma",
      email: diplome[2],
      // diplome: data[i][9], //filiere
      diplome: diplome[8],
      filiere: diplome[9],
      date: diplome[10]
    };
    axios.post("http://localhost:5000/email", emailData);
  };

  // many
  const updateAll = async () => {
    for (let i = 0; i < data.length; i++) {
      let diplome = [];

      for (let j = 0; j < data[0].length; j++) {
        diplome.push(data[i][j].toString());
      }

      await update2(diplome);

      // let eml = diplome[1].toLowerCase().split(" ");
      // eml = eml.join(".");
      //Updates : Cne fullName cni email birthDate placeDate mention faculty degree filière date
      let emailData = {
        CNE: diplome[0],
        name: diplome[1],
        email: diplome[3],
        
        diplome: diplome[9] // filiere
      };

      axios.post("http://localhost:5000/email", emailData);
    }
  };

  //------------------------------------------------------------------

  const [data, setData] = useState([]);

  const handleFile = async (e) => {
    console.log("reading input file:");
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
  };

  //------------------------------------------------------------------

  return (
    <div className="App ">
      <NavBar />
      <h1 className=" m-auto text-6xl p-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-400">
        Update Page
      </h1>
      {/* <input type="text" value="test" placeholder="Test" onChange={(e) => setApogee(e.target.value)} /> */}
      <section className="w-full flex flex-row justify-evenly items-start content-start">
      <div className="flex flex-col justify-start items-center">
      <h1 className="text-3xl mt-3 mb-4 font-extrabold text-transparent capitalize bg-clip-text bg-gradient-to-r from-[#333] to-[#444]">
        Update A diploma
        </h1>
        <TextField
            id="outlined-basic"
            label="Code Appogée"
            variant="outlined"
            value={apogee}
            onChange={(e) => setApogee(e.target.value)}
          />
        {/* &nbsp;&nbsp;
        <input type="submit" onClick={() => updateElem()} /> */}
        {/* &nbsp;&nbsp;
        <input type="file" onInput={(e) => handleFile(e)} /> */}
        <div className="w-full flex justify-center gap-6 items-center p-4 m-4">
          {/* <input type="file" onInput={(e) => handleFile(e)} /> */}
          <Input type="file"  onInput={(e) => handleFile(e)} />
          {/* <button onClick={() => saveData()}>Save Data</button>&nbsp;&nbsp; */}
          <Button
            variant="contained"
            disableElevation
            onClick={() => updateElem()}
          >
            Update A Diploma
          </Button>
        </div>
      </div>

      {/* multi */}
      <div className="flex flex-col justify-start items-center">
        <p></p>
        <h1 className="text-3xl font-extrabold text-transparent capitalize bg-clip-text bg-gradient-to-r from-[#333] to-[#444]">
        Update multipale diplomes
        </h1>
        {/* &nbsp;&nbsp;
        <input type="file" onInput={(e) => handleFile(e)} />
        &nbsp;&nbsp;
        <input type="submit" onClick={() => updateAll()} /> */}
        {/* yyyyyyyyyyyyyyyyy */}
        <div className="w-full flex justify-center gap-6 items-center p-4 mt-[95px]">
          {/* <input type="file" onInput={(e) => handleFile(e)} /> */}
          <Input type="file"  onInput={(e) => handleFile(e)} />
          {/* <button onClick={() => saveData()}>Save Data</button>&nbsp;&nbsp; */}
          <Button
            variant="contained"
            disableElevation
            onClick={() => updateAll()}
          >
            Update A Diplomas
          </Button>
        </div>
      </div>
      </section>
    </div>
  );
}

export default Update;
