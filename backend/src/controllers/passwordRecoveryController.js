import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import clientsModel from "../models/Client.js";
import employeeModel from "../models/Employee.js";
import { HTMLRecoveryEmail, sendEmail } from "../utils/mailPasswordRecovery.js";
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
};

passwordRecoveryController.verifyCode = async (req, res) => {
    const {code} = req.body;

    try {

        //obtener el token guardado en la cookie
        const token  = req.cookies.tokenRecoveryCode;

        //extraer todos los datos del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        //comparar el codigo que esta guardado en el token 
        //con el codigo que el usuario escribio

        if (decoded.code !== code) {

            return res.json({message: "Invalid code"});

            
        }

        //marcamos el token como verificado 
        const newToken = jsonwebtoken.sign(
            //1- ¿que vamos a guardar?
            {email: decoded.email,
             code: decoded.code,
             userType: decoded.userType, 
             verified: true},

             //2- secret key
             config.JWT.secret,
             //3- cuando expira
             {expiresIn: "25m"}
        )
        
        res.cookie("tokenRecoveryCode", newToken, {maxAge: 25*60*1000})

        res.json({message: "Code verified successfully"})

    } catch (error) {
        console.log("Error" + error)
    }
};

passwordRecoveryController.newPassword = async (req, res) => {
    const { newPassword } = req.body;

    try {

        //accederel token que esta en las cookies
        const token = req.cookies.tokenRecoveryCode

        //decodificar el token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        //verificar si el codigo ya fue verificado
        if(!decoded.verified){
            return res.json({message: "Code not verified"})

        }

        let user;
        
        //encriptar la contraseña
        const hashedPassword = await bcryptjs.hash(newPassword, 10)

        //guardar nueva contraseña en la base de datos

        if(decided.userType == "client"){
            user = await clientsModel.findOneAndUpdate(
                {email},
                {password: hashedPassword},
                {new: true}
            )
        }

        if(decided.userType == "employee"){
            user = await clientsModel.findOneAndUpdate(
                {email},
                {password: hashedPassword},
                {new: true}
            )
        }

        res.clearCookie("tokenRecoveryCode")

        res.json({message: "Password Updated"})
        
    } catch (error) {
        console.log("error" + error);
    }
};

export default passwordRecoveryController;