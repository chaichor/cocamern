/*en este archivo dentro de la carpeta routes, vamos a colocar que metodos tiene la ruta "/api/Client*/
import express from "express";
import clientController from "../controllers/clientController.js";

const router = express.Router();

router
.route("/")
.get(clientController.getClient)
.post(clientController.insertClient)

router
    .route("/:id")
.put(clientController.updateClient)
.delete(clientController.deleteClient);

export default router;