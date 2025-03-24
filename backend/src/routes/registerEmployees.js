import express from "express";
import registerEmployeesController from "../controllers/registerEmployesController.js";

const router = express.Router();

router.route("/").post(registerEmployeesController.register);

export default router;