pragma solidity ^0.4.24;

contract GestionCurso {
    
    struct instructor{
        string fName;
        uint age;
    }

    struct curso{
        string nombreCurso;
        uint nSesiones;
    }

    instructor public miInstructor;   
    mapping(uint => curso) public misCursos;
    uint public ncursos;
   
    function setInstructor(string _fName, uint _age) public {
        miInstructor.fName = _fName;
        miInstructor.age = _age;
    }
   
    function getInstructor() public view returns (string, uint) {
        return (miInstructor.fName, miInstructor.age);
    }

    function registraCurso(string _name, uint _nsesiones) public {
        misCursos[ncursos++] = curso(_name,_nsesiones);
    }
    
    function getCursoByID(uint _id) public view returns (string, uint) {
        return (misCursos[_id].nombreCurso, misCursos[_id].nSesiones);
    }
}