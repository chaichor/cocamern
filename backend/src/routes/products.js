/*en este archivo dentro de la carpeta routes, vamos a colocar que metodos tiene la ruta "/api/products*/
import express from "express";
import productsController from "../controllers/productController.js";

const router = express.Router();

router
.route("/")
.get(productsController.getProducts)
.post(productsController.insertProducts)

router
    .route("/:id")
.put(productsController.updateProducts)
.delete(productsController.deleteProducts);

export default router;
