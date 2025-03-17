/*
Campos:
name
address
telephone
schedule
*/

import { Schema, model } from "mongoose";

const branchSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  address: {
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
    required: true,
  },
  schedule: {
    type: String, // Podrías usar un objeto si necesitas más detalle (ej: {lunes: "9-5", martes: "9-5"...})
    required: true,
  },
}, {
  timestamps: true,
  strict: true,
});

export default model("Branch", branchSchema);
