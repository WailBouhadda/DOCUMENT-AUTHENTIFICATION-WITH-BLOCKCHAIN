// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Storage {
    
    struct Diplome{
        string CNE;
        string CNI; //0 = to do 1 = busy 2 = done
        string firstName;
        string lastName;
        string birthDate;
        string birthPlace;

        string universityName;
        string diplomeTitle;
        string brancheName;
        string brancheOption;
        string note;
        string date;

    }

    Diplome[] public diplomes;
    event DiplomeCreated(string _CNE);

    function createDiplome(string[] memory _dip) public {
        require(_dip.length == 12, "Error some parameters missing. Should be at least 11 parameter 12");
        
        Diplome memory newDiplome = Diplome({
            CNE: _dip[0],
            CNI: _dip[1],
            firstName: _dip[2],
            lastName: _dip[3],
            birthDate: _dip[4],
            birthPlace: _dip[5],

            universityName: _dip[6],
            diplomeTitle: _dip[7],
            brancheName: _dip[8],
            brancheOption: _dip[9],
            note: _dip[10],
            date: _dip[11]
        });
        
        diplomes.push(newDiplome);
        emit DiplomeCreated(_dip[0]);
    }

    function getDiplomes() external view returns(Diplome[] memory) {
        return diplomes;
    }

    function filterDiplomes(string memory _date ,string memory _univer ,string memory _filiere) external view returns(Diplome[] memory) {

        uint256 resultCount;

        for (uint i = 0; i < diplomes.length; i++) {
            if ((keccak256(bytes((diplomes[i].date))) == keccak256(bytes((_date)))) && (keccak256(bytes((diplomes[i].universityName))) == keccak256(bytes((_univer)))) && (keccak256(bytes((diplomes[i].diplomeTitle))) == keccak256(bytes((_filiere))))){
                resultCount++; 
            }
        }

        Diplome[] memory result = new Diplome[](resultCount);
        uint256 j;

        for (uint i = 0; i < diplomes.length; i++) {
            if ((keccak256(bytes((diplomes[i].date))) == keccak256(bytes((_date)))) && (keccak256(bytes((diplomes[i].universityName))) == keccak256(bytes((_univer)))) && (keccak256(bytes((diplomes[i].diplomeTitle))) == keccak256(bytes((_filiere))))){
                result[j] = diplomes[i];
                j++;
            }
        }

        return result;
    }

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
