//importo todo lo de la libreria
import express from "express";
import productRoutes from "./src/routes/products.js"
import clientRoutes from "./src/routes/client.js"
import employeeRoutes from "./src/routes/employee.js"
import branchesRoutes from "./src/routes/branches.js"
import categoriesRoutes from "./src/routes/categories.js"
import reviewsRoutes from "./src/routes/reviews.js"
import assessmentRoutes from "./src/routes/assessment.js"

//crear const que es igual a la libreria que importe y la ejecuta
const app = express();

//uso middleware para que acepte datos json
app.use(express.json());

//definir la ruta ENDPOINT
app.use("/api/products", productRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/assessment", assessmentRoutes);




//exporto la cons para usar express en otras partes
export default app;




