/*
Campos:
name
num
*/

import { Schema, model } from "mongoose";

const transportSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  num: {
    type: String,
  },
}, {
  timestamps: true,
  strict: true,
});

export default model("Transport", transportSchema);