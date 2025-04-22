import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import clientsModel from "../models/Client.js";
import employeeModel from "../models/Employee.js";
import { HTMLRecoveryEmail, sendEmail } from "../utils/mailPasswordRecovery";
import { config } from "../config.js";

//1. crear aray de funciones 
const passwordRecoveryController = {};

   passwordRecoveryController.requestCode = async (req,res) =>{
      const { email } = req.body;

      try {
        let userFound;
        let userType;


    userFound = await clientsModel.findOne({ email });
    if(userFound){
    userType = "Client";
    }else {
    userFound = await employeeModel.findOne({email})
    userType = "Employee"
    }

    if(!userFound){
    return res.json({message: "User not found"})
    }

    //generar codigo de 6 digitos

    const code = Math.floor(10000 + Math.random() * 60000 ).toString();

    //generar token
    const token = jsonwebtoken.sign(

    //1. ¿q voy a guardar?
    {email, code, userType, verified: false},
    //2. secret key
    config.JWT.secret,
    //3. cuando expira
    {expiresIn: "25m"}
    )

    res.cookie("tokenRecoveryCode", token, {maxAge: 25 * 60 * 1000})

    //enviamos el correo
    await sendEmail(
    email, 
    "Password Recovery Code Is",
    `Your verification code is ${code}`,
    HTMLRecoveryEmail(code)
    );

    res.json({message: "Verification code send"})
    } catch (error) {


        console.log("error" + error);
        
    }
}