import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js"

export const validateAuthToken = (allowedUserTypes = []) => {

    return (req, res, next) => {
        try {
            
            //2. extraer el token de las cookies
            const {authToken} = req.cookies;
            //1. validar si existen las cookies
            if(!authToken)
            {
                return res.json({message: "No Cookies Found, authorization required"})

            }

            //3. extraemos toda la informacion que tiene el token
            const decoded = jsonwebtoken.verify(authToken, config.JWT.secret)

            //almacenar los datos del usuario en un request
            req.user = decoded

            //verificar el rol
            if(!allowedUserTypes.includes(decoded.userType)){
                
                return res.json({messag: "Acces denied"})
            }

            //si el si esta, podemos continuar
            next()
        } catch (error) {
            console.log("error"+error)
        }
    }
}
