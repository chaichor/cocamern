//importo todo lo de la libreria
import express from "express";
import cors from "cors";
import productRoutes from "./src/routes/products.js"
import clientRoutes from "./src/routes/client.js"
import employeeRoutes from "./src/routes/employee.js"
import branchesRoutes from "./src/routes/branches.js"
import categoriesRoutes from "./src/routes/categories.js"
import reviewsRoutes from "./src/routes/reviews.js"
import assessmentRoutes from "./src/routes/assessment.js"
import registerEmployeesRoutes from "./src/routes/registerEmployees.js"
import registerClientsRoute from "./src/routes/registerClientes.js"
import loginRoute from "./src/routes/login.js"
import logoutRoute from "./src/routes/logout.js"
import cookieParser from "cookie-parser";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js"; 
import blogRoutes from "./src/routes/blog.js"
import transportRoutes from "./src/routes/transport.js"
import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";
import swaggerUi from "swagger-ui-express"

import fs from "fs"
import path from "path";




//crear const que es igual a la libreria que importe y la ejecuta
const app = express();

// Configuración de CORS para permitir peticiones desde el frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//uso middleware para que acepte datos json
app.use(express.json());
//que acepte las cookies
app.use(cookieParser());


//utilizar el sistema de archivos, para leer el json de swaggerUI y ver la documentacion

const swaggerDocument = JSON.parse(fs.readFileSync(
   path.resolve("./swagg.json"), "utf-8")
)

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//definir la ruta ENDPOINT
app.use("/api/products", productRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/employee", validateAuthToken(["employee", "Admin"]), employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/transport", transportRoutes);

//register employee
app.use("/api/registerEmployees", registerEmployeesRoutes);
//login
app.use("/api/login", loginRoute);
//logout
app.use("/api/logout", logoutRoute)

//register cliente tio
app.use("/api/registerClients", registerClientsRoute)
app.use("/api/passwordRecovery", passwordRecoveryRoutes)

//cloudinary
app.use("/api/blog", blogRoutes)




//exporto la cons para usar express en otras partes
export default app;




