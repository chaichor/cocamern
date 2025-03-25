//Como vamos a validar si es cliente o empleado entonces importo ambos modelos
import ClientsModel from "../models/Client.js";
import EmployeeModel from "../models/Employee.js";
import bcryptjs from "bcryptjs"; //lib encriptar
import jsonwebtoken from "jsonwebtoken"; //lib del token
import { config } from "../config.js"; //configuracion
  
const loginController = {};

loginController.login = async (req,res) => {

    const {email,password} = req.body;

    try{


        //validamos los 3 posibles niveles
        //admin, empleado, cliente

        let userFound; //usuario encontrado
        let userType; //nivel de usuario

        //1. verificamos si el que ingresa es nivel ADMIN
        if(email === config.Admin.email && passsword === config.Admin.password){
            userType = "Admin";
            userFound = {_id: "Admin"};
        }
        else 
        {
        //2. Verificamos si es empleado

        userFound = await EmployeeModel.findOne({email});
        userType = "Employee";

        if(!userFound){
            //3. cliente
            userFound = await ClientsModel.findOne({email});
            userType = "Cliente";
        }

        }

        //si no encontramos ningun usuario
        if(!userFound){
        return res.json({message: "User not found"})
        }

        //si no es administrador validamos contraseña
        if(userType !== "Admin"){
        const isMatch = bcryptjs.compare(password, userFound.password);

        if(!isMatch){
            return res.json({message: "Invalid Password"});
        }
        }

        //generamos el token
        jsonwebtoken.sign(

            //1. lo que guardare
            {id: userFound._id, userType},
            //2. clave secreta
            config.JWT.secret,
            //3. cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4. funcion flecha
            (error, token) => {
                if (error) console.log(error);
                res.cookie("authToken", token)
                res.json({message: "login succesful"})
            }
        )

    }catch(error){

        console.log(error);

    }
}

export default loginController;