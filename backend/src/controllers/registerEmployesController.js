//importamos modelo de la base de datos
import Employee from "../models/Employee.js";
import bcryptjs from "bcryptjs"; //lib encriptar
import jsonwebtoken from "jsonwebtoken"; //lib del token
import { config } from "../config.js"; //configuracion


//creamos array de funciones
const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
   //pedimos todos los datos
   const{name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;
   try {
    //verificamos si el empleado ya existe
    const existEmployee = await Employee.findOne({email});
    if(existEmployee){
        return res.json({message: "El empleado ya existe"});

    }

    //hashear o encriptar la contraseña

    const passwordHash = await bcryptjs.hash(password, 10);

    //luego de encriptar ya podemos guardar el empleado en la DB


    const newEmployee = new Employee({
        name, 
        lastName, 
        birthday, 
        email, 
        address, 
        hireDate, 
        password: passwordHash, 
        telephone, 
        dui, 
        isssNumber, 
        isVerified});

    await newEmployee.save(); 

    jsonwebtoken.sign( 
        //-1 que voy a guardar
        {id: newEmployee._id},
        //-2 clave secreta
        config.JWT.secret,
        //-3 cuando expira
        {expiresIn: config.JWT.expiresIn},
        //-4 funcion flecha
        (error, token) => {
            if(error) console.log(error);
            res.cookie("authToken ", token)
            res.json({message: "empleado registrado"})
        }
    );

   } catch(error) {
    console.log(error);
    res.json({message: "Error al registrar empleado"});

   }

};

export default registerEmployeesController;








