import blogModel from "../models/blog.js";
import { v2 as cloudinary } from "cloudinary";

import {
    config
} from  "../config.js"

//1- configurar cloudinary

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

//2- array de funciones vacio

const blogController = {}

//obtener post del blog
blogController.getAllPosts = async (req, res) => {

    const posts = await blogModel.find()
    res.json(posts)
}

//subir post al blog

blogController.createPost = async (req, res) => {

    try {
        const {title, content} = req.body;
        let imageUrl = ""

        if(req.file){
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "public",
                    allowed_formats: ["jpg", "png", "jpeg"]
                }
            );
            imageUrl = result.secure_url
        }

        const newPost = new blogModel({title, content, image: imageUrl})
        newPost.save()

        res.json({message: "post guardao"})
    } catch (error) {

        console.log("error" + error)
        
    }
}

export default blogController;
