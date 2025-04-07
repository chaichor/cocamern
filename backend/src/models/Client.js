/*
Campos:
name
lastName
birthday
email
password
telephone
dui
isVerified (booleano)
*/

import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  birthDay: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{8}$/.test(v);
      },
      message: "El número de teléfono debe tener 8 dígitos.",
    },
  },
  dui: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{8}-\d{1}$/.test(v);
      },
      message: "El DUI debe tener el formato correcto (xxxxxxxx-x).",
    },
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  strict: false,
});

export default model("client", clientSchema);
