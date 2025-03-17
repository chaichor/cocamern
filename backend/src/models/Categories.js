/*
Campos:
name
address
telephone
schedule
*/

import { Schema, model } from "mongoose";

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
}, {
  timestamps: true,
  strict: true,
});

export default model("Categories", categoriesSchema);
