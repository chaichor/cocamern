//import app.js
import app from "./app.js";
import "./database.js";
import { config } from "./src/config.js";

//creo la funcion que debe ejecutar el servidor
async function main(){

    app.listen(config.server.port);
    console.log("server en el puerto " + config.server.port)
    console.log("Buen Dia ")
}
//ejecutamos todo 
main();