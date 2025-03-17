//import app.js
import app from "./app.js";
import "./database.js";
import { config } from "./src/config.js";

//creo la funcion que debe ejecutar el servidor
async function main(){

    app.listen(config.server.port);
    console.log("server on port" + config.server.port)
}
//ejecutamos todo 
main();