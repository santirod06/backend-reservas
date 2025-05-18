const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const claseSchema = new Schema(
  {
    horario: {
      type: Date,
      required: true,
    },
    profesor: {
      type: String,
      required: true,
    },
    cupos: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clase", claseSchema);
