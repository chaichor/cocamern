/*
    Coleccion: Blog
 
    Campos:
        Title
        Content
        Image
*/
 
import { Schema, model } from "mongoose";
 
const BlogSchema = new Schema(
  {
    title: {
        type: String,
       
    },
    content: {
        type: String,
 
    },
    image: {
        type: String,
 
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);
 
export default model("blog", BlogSchema);