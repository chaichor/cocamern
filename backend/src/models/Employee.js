/*
Campos:
name
lastName
birthday (Date o String)
email
address
hireDate (Date o String)
password
telephone
dui
isssNumber
isVerified (booleano)
*/

import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
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
  birthday: {
    type: String, // Puede usar Date o String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
  },
  hireDate: {
    type: String, // Puede usar Date o String
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
  isssNumber: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  strict: true,
});

export default model("Employee", employeeSchema);
