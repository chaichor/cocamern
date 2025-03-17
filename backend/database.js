import mongoose from "mongoose";

//importo variables del archivo config
import { config } from "./src/config.js";
//guardo en una const la direccion de mi base de datos

const URI = ""

//conectar db

mongoose.connect(config.db.URI)

//---------------validacion de que la base sirve-------------------------

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB is Connected");
});

connection.once("disconnected", () => {
    console.log("DB is Disconnected");
});

connection.once("error", (error) => {
    console.log("DB is error" + error);
});

