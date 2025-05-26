import express from "express";
import multer from "multer";
import blogController from "../controllers/blogController.js";

const router = express.Router();
const upload = multer({ dest: "public/" });

router
  .route("/")
  .get(blogController.getAllPosts)
  .post(upload.single("image"), blogController.createPost);

// Ruta para actualizar post por ID
router
  .route("/:id")
  .put(upload.single("image"), blogController.updatePost)
  .delete(blogController.deletePost);

export default router;

