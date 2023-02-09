import "./styles.css";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import niveauData from "../data/data";
import Faculties from "../data/faculties";
import { init, getDiplomes } from "../web3Service/diplomeService";
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

function List() {
  const [contract, setContract] = useState();

  useEffect(() => {
    init();
  }, []);

  //---------------------------------------------------------------------------------------------------------------

  const [students, setStudents] = useState([]);

  const [faculty, setFaculty] = useState("");
  const [niveau, setNiveau] = useState("");
  const [filiere, setFiliere] = useState("");
  const [date, setDate] = useState("");

  const getStudents = async () => {
    const transaction = await getDiplomes();
    setStudents(transaction);
  };

  //---------------------------------------
  const [data, setData] = useState([]);
  const getData = () => {
    getStudents();
    console.log(students);
    console.log(students[0].Filiere);
    let DATA = students.filter(
      (std) =>
        std.Filiere === filiere &&
        std.faculty === faculty &&
        std.Diplome === niveau &&
        std.Date === date
    );
    /*
    students.filter((val) => {
        return val.Faculty === faculty
    })
        map((element) => (        
        DATA.push(element)
    ))*/

    console.log(DATA);
    setData(DATA);
  };
  //---------------------------------------

  return (

    // <div className="App">
    //   <br />
    //   <br />

    //   <Form.Select
    //     className="middle"
    //     style={{ width: 400 }}
    //     value={faculty}
    //     onChange={(e) => {
    //       setFaculty(e.target.value);
    //     }}
    //   >
    //     <option disabled selected>
    //       Etablissement{" "}
    //     </option>
    //     {Faculties.map((element) => (
    //       <option key={element.name} value={element.name}>
    //         {element.name}
    //       </option>
    //     ))}
    //   </Form.Select>

    //   <br />

    //   <Form.Select
    //     className="middle"
    //     style={{ width: 400 }}
    //     aria-label="Niveau"
    //     value={niveau}
    //     onChange={(e) => {
    //       setNiveau(e.target.value);
    //     }}
    //   >
    //     <option disabled selected>
    //       Diplome{" "}
    //     </option>
    //     <option value="Master">Master</option>
    //     <option value="Licence">Licence</option>
    //   </Form.Select>

    //   <br />

    //   <Form.Select
    //     className="middle"
    //     style={{ width: 400 }}
    //     aria-label="Niveau"
    //     value={filiere}
    //     onChange={(e) => {
    //       setFiliere(e.target.value);
    //     }}
    //   >
    //     <option disabled selected>
    //       Filiere{" "}
    //     </option>
    //     {niveauData
    //       .filter((val) => {
    //         return val.niveau === niveau && val.faculty === faculty;
    //       })
    //       .map((element) => (
    //         <option key={element.Filiere} value={element.Filiere}>
    //           {element.Filiere}
    //         </option>
    //       ))}
    //   </Form.Select>

    //   <br />

    //   <Form.Control
    //     className="middle"
    //     style={{ width: 400 }}
    //     placeholder="Date d'obtention"
    //     value={date}
    //     onChange={(e) => {
    //       setDate(e.target.value);
    //     }}
    //   />

    //   <br />

    //   <input className="middle" type="submit" onClick={() => getData()} />

    //   <br />
    //   <br />

    //   <div className="m-3">
    //     <table className="table table-striped">
    //       <thead>
    //         <tr>
    //           <th scope="col">CNE</th>
    //           <th scope="col">Nom et Prenom</th>
    //           <th scope="col">CNI</th>
    //           <th scope="col">Date De Naissance</th>
    //           <th scope="col">Lieu De Naissance</th>
    //           <th scope="col">Mention</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.map((item) => {
    //           return (
    //             <tr key={item[0]}>
    //               <td>{item[0]}</td>
    //               <td>{item[1]}</td>
    //               <td>{item[2]}</td>
    //               <td>{item[3]}</td>
    //               <td>{item[4]}</td>
    //               <td>{item[5]}</td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
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
              label="Niveau"
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
          {/* <Input type="file" accept=".csv" onInput={(e) => handleFile(e)} /> */}
        
          {/* <button onClick={() => saveData()}>Save Data</button>&nbsp;&nbsp; */}
          <Button
            variant="contained"
            disableElevation
            onClick={() => getData()}
          >
            Show
          </Button>
        </div>
      </section>
      {/* table */}
          <TableData data={data}/>
      {/*  */}
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

export default List;
