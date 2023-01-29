// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Storage {
    
    struct Student{
        string codeApogee; //0 = to do 1 = busy 2 = done
        string studentName;
        string studentEmail;
        string diplomeTitle;
    }

    Student[] public students;

    function createStudent(string memory _codeApogee, string memory _studentName, string memory _studentEmail, string memory _diplomeTitle) external {
        students.push(Student(_codeApogee, _studentName, _studentEmail, _diplomeTitle));
    }

    function getStudents() external view returns(Student[] memory) {
        return students;
    }

    function deleteLastStudent() external {
        students.pop();
    }

    function getStudent(string memory _codeApogee) public view returns (Student memory) {
        for(uint i = 0; i < students.length; i++){
            if (keccak256(bytes(students[i].codeApogee)) == keccak256(bytes(_codeApogee))){
                return students[i];
            }
        }
    }

    // function getFile(string memory _hash) external view returns(File[] memory) {
    //     for (uint i = 0; i < files.length; i++) {
    //         if (keccak256(bytes(files[i].fileHash)) == keccak256(bytes(_hash))) {
    //             return files[i];
    //         }
    //     }
    // }

}
