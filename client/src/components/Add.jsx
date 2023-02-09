import "../App.css";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { init, creatDiplome, getDiplomes } from "../web3Service/diplomeService";
import niveauData from "../data/data";
import Faculties from "../data/faculties";
// MUI
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import TableData from "./TableData";
import NavBar from "../Navbar/Navbar";

function App() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    init();
  }, []);

  //---------------------------------------------------------------------------------------------------------------

  const getStudents = async () => {
    const transaction = await getDiplomes();
    console.log(transaction);
  };
  //mention: mention,
  //birthDate: birthDate,
  //birthPlace: birthPlace

  const addNewStudent = async (diplome) => {
    const transaction = await creatDiplome(diplome);
    await transaction.wait();
    console.log(transaction);
  };

  //---------------------------------------------------------------------

  const [data, setData] = useState([{}]);

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
    console.log({ jsonData });
    setData(jsonData);
  };

  //---------------------------------------------------------------------

  const [niveau, setNiveau] = useState("");
  const [filiere, setFiliere] = useState("");
  const [date, setDate] = useState("");
  const [faculty, setFaculty] = useState("");

  const saveData = async () => {
    console.log({ data });
    for (let i = 0; i < data.length; i++) {
      //(_apogee, _name, _email, _cne, _niveau, _filiere, _date, _mention, _birthDate, _birthPlace)
      // new format of csv file
      // Diplôme  : cne fullname email cni birthDay placeDate mention
      // data : faculty degree filier date
      // toBlockchain : cne fullname email cni birthDay placeDate mention faculty degree filier date
      let diplome = [];
      for (let j = 0; j < data[i].length; j++) {
        console.log(data[i][j]);
        diplome.push(data[i][j].toString());
      }
      diplome.push(faculty.toString());
      diplome.push(niveau.toString());
      diplome.push(filiere.toString());
      diplome.push(date.toString());

      // see diploma format
      // diplome.map((d)=>{
      //   console.log(d.toString());
      // })
      // let eml = diplome[1].toLowerCase().split(" ");
      // eml = eml.join(".");
      // setData(diplome);
      await addNewStudent(diplome);

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
    }
  };

  return (
    <div className="">
      <NavBar />
      {/* start faculaties */}
      {/* <Form.Select
        className="middle"
        style={{ width: 400 }}
        value={faculty}
        onChange={(e) => {
          setFaculty(e.target.value);
        }}
      >
        {Faculties.map((element) => (
          <option key={element.name} value={element.name}>
            {element.name}
          </option>
        ))}
      </Form.Select> */}
      {/* èèèèèèèèèèèèèèèèèèèèèèèèèè */}
      <section className="w-full flex flex-col justify-between gap-3 items-center content-center p-4 m-4">
        <div className="w-[300px]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Faculty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={faculty}
              label="Faculty"
              onChange={(e) => {
                setFaculty(e.target.value);
              }}
            >
              {Faculties.map((element) => (
                <MenuItem key={element.name} value={element.name}>
                  {element.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* degree */}
        {/* <Form.Select
        className="middle"
        style={{ width: 400 }}
        value={niveau}
        onChange={(e) => {
          setNiveau(e.target.value);
        }}
      >
        <option value="Master">Master</option>
        <option value="Licence">Licence</option>
      </Form.Select> */}
        <div className="w-[300px]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Degree</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={niveau}
              label="Faculty"
              onChange={(e) => {
                setNiveau(e.target.value);
              }}
            >
              <MenuItem value="Master">Master</MenuItem>
              <MenuItem value="Licence">Licence</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* filier */}
        {/* <Form.Select
        className="middle"
        style={{ width: 400 }}
        value={filiere}
        onChange={(e) => {
          setFiliere(e.target.value);
        }}
      >
        {niveauData
          .filter((val) => {
            return val.niveau === niveau && val.faculty === faculty;
          })
          .map((element) => (
            <option key={element.Filiere} value={element.Filiere}>
              {element.Filiere}
            </option>
          ))}
      </Form.Select> */}
        <div className="w-[300px]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filiers</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filiere}
              label="Faculty"
              onChange={(e) => {
                setFiliere(e.target.value);
              }}
            >
              {niveauData
                .filter((val) => {
                  return val.niveau === niveau && val.faculty === faculty;
                })
                .map((element) => (
                  <MenuItem key={element.Filiere} value={element.Filiere}>
                    {element.Filiere}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        {/* data controle */}
        {/* <Form.Control
        className="middle"
        style={{ width: 400 }}
        placeholder="Date d'obtention"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
      /> */}
        <TextField
          id="outlined-basic"
          label="Date"
          variant="outlined"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <div className="w-full flex justify-center gap-6 items-center p-4 m-4">
          {/* <input type="file" onInput={(e) => handleFile(e)} /> */}
          <Input
            type="file"
            required={true}
            onInput={(e) => {
              handleFile(e);
            }}
          />

          {/* <button onClick={() => saveData()}>Save Data</button>&nbsp;&nbsp; */}
          <Button
            variant="contained"
            disableElevation
            onClick={() => saveData()}
          >
            Upload To Blockchain
          </Button>
        </div>
      </section>
      {/* table */}
      {data.length > 1 ? <TableData data={data} faculty={faculty} filiere={filiere}/> : ""}

      {/* <div className="m-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">CNE</th>
              <th scope="col">Nom et Prenom</th>
              <th scope="col">CNI</th>
              <th scope="col">Date De Naissance</th>
              <th scope="col">Lieu De Naissance</th>
              <th scope="col">Mention</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item[0]}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  <td>{item[4]}</td>
                  <td>{item[5]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default App;
