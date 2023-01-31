import React from 'react'

function DiplomesTable({studentData,setStudentData}) {
  return (
    <div className='mb-5'>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">CNE</th>
            <th scope="col">CNI</th>
            <th scope="col">Prenom</th>
            <th scope="col">Nom</th>
            <th scope="col">Date De Naissance</th>
            <th scope="col">Lieu De Naissance</th>
            <th scope="col">Etablissement</th>
            <th scope="col">Diplome</th>
            <th scope="col">Filiere</th>
            <th scope="col">Option</th>
            <th scope="col">Note</th>
            <th scope="col">Date d'ajout</th>
            <th scope="col">Afficher Diplome</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((item) => {
                  return (
            <tr key={item[0]}>
              <td scope="row">{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
              <td>{item[5]}</td>
              <td>{item[6]}</td>
              <td>{item[7]}</td>
              <td>{item[8]}</td>
              <td>{item[9]}</td>
              <td>{item[10]}</td>
              <td>{item[11]}</td>
              <td><a href={`/show/${item[0]}`}><button>Afficher</button></a></td>
            </tr>
                  )
          })}

        </tbody>
      </table>
    </div>
  )
}

export default DiplomesTable