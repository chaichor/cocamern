/*en este archivo dentro de la carpeta routes, vamos a colocar que metodos tiene la ruta "/api/categories*/
import express from "express";
import transportController from "../controllers/transportController.js";

const router = express.Router();

router
.route("/")
.get(transportController.getTransports)
.post(transportController.insertTransport)

router
    .route("/:id")
.put(transportController.updateTransport)
.delete(transportController.deleteTransport);

export default router;