// El modelo de reserva va a guardar originalmente en el Usuario que la realiza, en este modelo lo usamos 
// para guardar el usuario que realizo la reserva, la clase que reservó y cuando la reservó, de momento no tiene
// utilidad, pero no lo borro porque puede servir cuando se le añada complejidad al backend en un futuro.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservaSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario", 
      required: true,
    },
    clase: {
      type: Schema.Types.ObjectId,
      ref: "Clase", 
      required: true,
    },
    fechaReserva: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reserva", reservaSchema);