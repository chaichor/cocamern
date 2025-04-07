import jsonwebtoken from  "jsonwebtoken"; //generar token
import bcrypt from "bcryptjs"; //encriptar tio
import nodemailer from "nodemailer"; //enviar correo
import crypto from "crypto"; //codigo aleatorio
import clientsModel from "../models/Client.js"
import { config } from "../config.js";

const registerClientsController = {};

registerClientsController.register = async(req, res) => {
    //1. solicitar las cosas que vamos a guardar
    const {name,
         lastName,
          birthDay,
           email,
            password,
             telephone,
              dui,
               isVerified} = req.body;

    try {
        //verificamos si el cliente ya existe
        const existsClient = await clientsModel.findOne({email})
        if(existsClient){
            return res.json({message: "Client already exists"})
        }

        //encriptar la contraseña 
        const passwordHash = await bcrypt.hash(password, 10)

        //guardo al cliente en la base de datos
        const newClient = new clientsModel(
            {
                name,
                    lastName,
                     birthDay,
                      email,
                       password: passwordHash,
                        telephone,
                         dui: dui || null,
                          isVerified: isVerified || false,
            }
        )
        await newClient.save();

        //generamos codigo aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex") //sin nada "" se crea solo con numeros

        //Crear el token 
        const tokenCode = jsonwebtoken.sign( 
            //-1 que voy a guardar
            {email, verificationCode},
            //-2 clave secreta
            config.JWT.secret,
            //-3 cuando expira
            {expiresIn: "1h"},
            //-4 funcion flecha
          
        )
        res.cookie("VerificationToken", tokenCode, {maxAge: 2*60*60*1000})

        //enviar correo
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass
            }
        })

        //quien recibe
        const mailOptions = {
            //quien lo envia?
            from: config.email.email_user,
            //quien recibe
            to:email,
            //asunto
            subject: "verificacion de correo",
            //cuerpo del correo (podemos mandar en html)
            text: `Para verificar tu correo, utiliza el siguiente codigo ${verificationCode}\n El codigo vence en dos horas`

        }

        //3 paso enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) return res.json({message: error})

                console.log("Correo enviado" + info.response)
                
        })

        res.json({message: "client registered. Please verify your email with the code"})



    } catch (error) {

        res.json({message: "Error" + error})
        
    }
};

//verificar el codigo
registerClientsController.verifyCodeEmail = async (req, res) => {
    const {verificationCode} = req.body;

    //obtengo el token de mi codigo de verificacion
    const token = req.cookies.VerificationToken;

    try{
        //verificar y decodificar el token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {email, verificationCode: storedCode} = decoded;
        //Comparar el codigo que enviamos al correo con el que el usuario escribe
        if(verificationCode !== storedCode){
            return res.json({message: "Invalid Code"})
        }

        const client = await clientsModel.findOne({email})
        client.isVerified = true
        await client.save()

        //Quito la cookie con el token 
        res.clearCookie("VerificationToken");


    }catch{

        res.json({message: "error"})


    }
}

export default registerClientsController
