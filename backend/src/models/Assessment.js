import { Schema, model } from "mongoose";

const assessmentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true, // Comentario debe ser obligatorio
    },
    grade: {
      type: Number,
      required: true,
      min: 0, // Puede ajustarse al rango que necesites (por ejemplo, de 0 a 10 o 1 a 5)
      max: 10, // Asegúrate de poner el máximo valor si es necesario
    },
    role: {
      type: String,
      required: true,
    },
    IdEmployee: {
      type: Schema.Types.ObjectId,
      ref: "Employee", // Referencia al modelo Employee
      required: true,
    },
  },
  {
    timestamps: true, // Esto agregará los campos createdAt y updatedAt automáticamente
    strict: true, // Esto asegura que no se agregarán campos no definidos en el esquema
  }
);

export default model("Assessment", assessmentSchema);