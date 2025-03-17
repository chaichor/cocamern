//array de funciones del employee
const employeeController = {};
import employeeModel from "../models/Employee.js";

//--------------------SELECT---------------------

employeeController.getEmployee = async (req, res) => {
    const employee = await employeeModel.find();
    res.json(employee);
};

// ------------------INSERT------------------------

employeeController.insertEmployee = async (req, res) => {

    const {name, lastName, birthDay, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;
    const newEmployee = new employeeModel({
        name, 
        lastName, 
        birthDay, 
        email,
        address,
        hireDate,
        password,
        telephone,
        dui,
        isssNumber,
        isVerified});
    await newEmployee.save();
    res.json({message: "employee saved"});
};

// ------------------ DELETE -------------------------

employeeController.deleteEmployee = async (req, res) => {
    await employeeModel.findByIdAndDelete(req.params.id)
    res.json({message: "employee deleted"});
};

// ------------------- UPDATE ------------------------

employeeController.updateEmployee = async (req, res) => {
    const {name, lastName, birthDay, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;
    const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.id, 
        {name, lastName, birthDay, email, address, hireDate, password, telephone, dui, isssNumber, isVerified}, {new: true});
        res.json({message: "employee updated"});
};

export default employeeController;