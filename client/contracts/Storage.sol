
// pragma solidity ^0.8.7;

// // Uncomment this line to use console.log
// // import "hardhat/console.sol";

// contract Storage {
    
//     struct Diplome{
//         string CNE;
//         string Name;
//         string CNI; 
//         string birthDate;
//         string birthPlace;
//         string Mention;

//         string faculty;
//         string Diplome;
//         string Filiere;
//         string Date;

//     }

//     Diplome[] public diplomes;
//     event DiplomeCreated(string _CNE);
//     event DiplomeUpdated(uint _res);

//     function createDiplome(string[] memory _dip) public {
        
//         for (uint i = 0; i < diplomes.length; i++) {
//             if ( (keccak256(bytes((diplomes[i].CNE))) == keccak256(bytes((_dip[0])))) && (keccak256(bytes((diplomes[i].Diplome))) == keccak256(bytes((_dip[7])))) ){
//                return;
//             }
//         }
//         Diplome memory newDiplome = Diplome({
//             CNE: _dip[0],
//             Name: _dip[1],
//             CNI: _dip[2],
//             birthDate: _dip[3],
//             birthPlace: _dip[4],
//             Mention: _dip[5],

//             faculty: _dip[6],
//             Diplome: _dip[7],
//             Filiere: _dip[8],
//             Date: _dip[9]
//         });
        
//         diplomes.push(newDiplome);
//         emit DiplomeCreated(_dip[0]);
//     }

//     function updateDiplome(string memory _cne,string[] memory _dip) public {
        
//         uint res = 0;
//         Diplome memory updatedDiplome = Diplome({
//             CNE: _dip[0],
//             Name: _dip[1],
//             CNI: _dip[2],
//             birthDate: _dip[3],
//             birthPlace: _dip[4],
//             Mention: _dip[5],

//             faculty: _dip[6],
//             Diplome: _dip[7],
//             Filiere: _dip[8],
//             Date: _dip[9]
//         });

//         for (uint i = 0; i < diplomes.length; i++) {
//             if ( (keccak256(bytes((diplomes[i].CNE))) == keccak256(bytes((_cne)))) ){
//                 diplomes[i] = updatedDiplome;
//                 res = 1;
//             }
//         }
//         emit DiplomeUpdated(res);
//     }

//     function updateDiplomes(string[] memory _dip) public {
        
//         uint res = 0;
//             Diplome memory updatedDiplome = Diplome({
//                 CNE: _dip[0],
//                 Name: _dip[1],
//                 CNI: _dip[2],
//                 birthDate: _dip[3],
//                 birthPlace: _dip[4],
//                 Mention: _dip[5],

//                 faculty: _dip[6],
//                 Diplome: _dip[7],
//                 Filiere: _dip[8],
//                 Date: _dip[9]
//             });

//             for(uint i = 0; i < diplomes.length; i++){
//                 if ( ( (keccak256(bytes((diplomes[i].CNE))) == keccak256(bytes((updatedDiplome.CNE)))) 
//                     && (keccak256(bytes((diplomes[i].Diplome))) == keccak256(bytes((updatedDiplome.Diplome))))
//                     )|| (
//                       (keccak256(bytes((diplomes[i].CNE))) == keccak256(bytes((updatedDiplome.CNE))))
//                     && (keccak256(bytes((diplomes[i].Date))) == keccak256(bytes((updatedDiplome.Date))))
//                     ) ){
//                     diplomes[i] = updatedDiplome;
//                     res = res + 1;
//                 }
//             }
            

//         emit DiplomeUpdated(res);
//     }

//     function getDiplomes() external view returns(Diplome[] memory) {
//         return diplomes;
//     }


//     function deleteLastDiplome() external {
//         diplomes.pop();
//     }

//     function getDiplome(string memory _CNE, string memory _dip ) public view returns (Diplome memory) {
//         for(uint i = 0; i < diplomes.length; i++){
//             if ( (keccak256(bytes(diplomes[i].CNE)) == keccak256(bytes(_CNE))) && (keccak256(bytes(diplomes[i].Diplome)) == keccak256(bytes(_dip))) ){
//                 return diplomes[i];
//             }
//         }
//     }
// }

// new 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Storage {
    
    struct Diplome{
       string CNE;
        string Name;
        string CNI; 
        string birthDate;
        string birthPlace;
        string Mention;
        string Email;

        string faculty;
        string Diplome;
        string Filiere;
        string Date;

    }

    Diplome[] public diplomes;
    event DiplomeCreated(string _CNE);
    event DiplomeUpdated(uint _res);

    function createDiplome(string[] memory _dip) public {
        // toBlockchain : cne fullname email cni birthDay placeDate mention faculty degree filier date      
        require(_dip.length == 12, "Error some parameters missing. Should be at least 11 parameter 12");
        for (uint i = 0; i < diplomes.length; i++) {
            if ( (keccak256(bytes((diplomes[i].CNE))) == keccak256(bytes((_dip[0])))) && (keccak256(bytes((diplomes[i].Diplome))) == keccak256(bytes((_dip[7])))) ){
               return;
            }
        }
        Diplome memory newDiplome = Diplome({
            CNE: _dip[0],
            Name: _dip[1],
            Email: _dip[2],
            CNI: _dip[3],
            birthDate: _dip[4],
            birthPlace: _dip[5],
            Mention: _dip[6],

            faculty: _dip[7],
            Diplome: _dip[8],
            Filiere: _dip[9],
            Date: _dip[10]
        });
        
        diplomes.push(newDiplome);
        emit DiplomeCreated(_dip[0]);
    }

    function getDiplomes() external view returns(Diplome[] memory) {
        return diplomes;
    }

    function filterDiplomes(string memory _date, string memory _dip, string memory _etab) external view returns(Diplome[] memory) {

        uint256 resultCount;

        for (uint i = 0; i < diplomes.length; i++) {
            if ((keccak256(abi.encodePacked((diplomes[i].Date))) == keccak256(abi.encodePacked((_date)))) && (keccak256(abi.encodePacked((diplomes[i].Diplome))) == keccak256(abi.encodePacked((_dip)))) && (keccak256(abi.encodePacked((diplomes[i].faculty))) == keccak256(abi.encodePacked((_etab))))) {
                resultCount++; 
            }
        }

        Diplome[] memory result = new Diplome[](resultCount);
        uint256 j;

        for (uint i = 0; i < diplomes.length; i++) {
            if ((keccak256(abi.encodePacked((diplomes[i].Date))) == keccak256(abi.encodePacked((_date)))) && (keccak256(abi.encodePacked((diplomes[i].Diplome))) == keccak256(abi.encodePacked((_dip)))) && (keccak256(abi.encodePacked((diplomes[i].faculty))) == keccak256(abi.encodePacked((_etab))))) {
                result[j] = diplomes[i];
                j++;
            }
        }

        return result;
    }


    // update

    function updateDiplome(string memory _cne,string[] memory _dip) public {

        // Update : cne fullName cni email birthDay placedate mention univ degree filiere  date
        uint res = 0;
        Diplome memory updatedDiplome = Diplome({
            CNE: _dip[0],
            Name: _dip[1] ,
            CNI: _dip[2],
            Email : _dip[3],
            birthDate: _dip[4],
            birthPlace: _dip[5],
            Mention: _dip[6],

            faculty: _dip[7],
            Diplome: _dip[8],
            Filiere: _dip[9],
            Date: _dip[10]
        });

        for (uint i = 0; i < diplomes.length; i++) {
            if ( (keccak256(bytes((diplomes[i].CNE))) == keccak256(bytes((_cne)))) ){
                diplomes[i] = updatedDiplome;
                res = 1;
            }
        }
        emit DiplomeUpdated(res);
    }

    function updateDiplomes(string[] memory _dip) public {
        //Updates : Cne fullName cni email birthDate placeDate mention faculty degree filière date
        uint res = 0;
            Diplome memory updatedDiplome = Diplome({
                CNE: _dip[0],
                Name: _dip[1],
                CNI: _dip[2],
                Email: _dip[3],
                birthDate: _dip[4],
                birthPlace: _dip[5],
                Mention: _dip[6],

                faculty: _dip[7],
                Diplome: _dip[8],
                Filiere: _dip[9],
                Date: _dip[10]
            });

            for(uint i = 0; i < diplomes.length; i++){
                if ( ( (keccak256(bytes((diplomes[i].CNE))) == keccak256(bytes((updatedDiplome.CNE)))) 
                    && (keccak256(bytes((diplomes[i].Diplome))) == keccak256(bytes((updatedDiplome.Diplome))))
                    )|| (
                      (keccak256(bytes((diplomes[i].CNE))) == keccak256(bytes((updatedDiplome.CNE))))
                    && (keccak256(bytes((diplomes[i].Date))) == keccak256(bytes((updatedDiplome.Date))))
                    ) ){
                    diplomes[i] = updatedDiplome;
                    res = res + 1;
                }
            }
            

        emit DiplomeUpdated(res);
    }

    // end update

    function deleteLastDiplome() external {
        diplomes.pop();
    }

    function getDiplome(string memory _CNE ) public view returns (Diplome memory) {
        for(uint i = 0; i < diplomes.length; i++){
            if (keccak256(bytes(diplomes[i].CNE)) == keccak256(bytes(_CNE))){
                return diplomes[i];
            }
        }
    }
}