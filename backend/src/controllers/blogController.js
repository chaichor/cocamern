import blogModel from "../models/blog.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const blogController = {};

// Obtener todos los posts
blogController.getAllPosts = async (req, res) => {
  const posts = await blogModel.find();
  res.json(posts);
};

// Crear un nuevo post
blogController.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    const newPost = new blogModel({ title, content, image: imageUrl });
    await newPost.save();

    res.json({ message: "Post guardado" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

// Actualizar un post por ID
blogController.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    let imageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    const updatedPost = await blogModel.findByIdAndUpdate(
      id,
      {
        title,
        content,
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Error al actualizar el post" });
  }
};

// Eliminar un post por ID
blogController.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await blogModel.findByIdAndDelete(id);
    res.json({ message: "Post eliminado" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};

export default blogController;

