const express = require("express");
const router = express.Router();
const Clase = require("../models/Clase");
const Usuario = require("../models/Usuario");

// Inscribir un usuario a una clase, (pasando usuarioId y claseId respectivos por el body)
router.post("/reservar", async (req, res) => {
  const { usuarioId, claseId } = req.body;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const clase = await Clase.findById(claseId);
    if (!clase) {
      return res.status(404).json({ error: "Clase no encontrada" });
    }

    if (usuario.reservas.some((reserva) => reserva.claseId.toString() === claseId)) {
      return res.status(400).json({ error: "Ya has reservado esta clase" });
    }

    if (clase.cupos <= 0) {
      return res.status(400).json({ error: "No tiene cupos disponibles" });
    }
    usuario.reservas.push({ claseId, fecha: new Date() });
    clase.cupos = clase.cupos - 1;

    await usuario.save();
    await clase.save();

    return res
      .status(200)
      .json({ message: "Reserva realizada con exito", usuario, clase });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Para obtener todas las reservas de un usuario especifico por su ID
router.get("/:usuarioId", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId).populate(
      "reservas.claseId"
    );

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(201).json(usuario.reservas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancelar la reserva de la clase de un usuario (pasar como endpoint los Id de usuario y clase respectivamente)
router.delete("/cancelar-reserva/:usuarioId/:claseId", async (req, res) => {
  try {
    const { usuarioId, claseId } = req.params;

    const usuario = await Usuario.findById(usuarioId);
    const clase = await Clase.findById(claseId);

    if (!usuario || !clase) {
      return res
        .status(404)
        .json({ mensaje: "la clase o el usuario no han sido encontrados" });
    }

    usuario.reservas = usuario.reservas.filter(
      (reserva) => reserva.claseId.toString() !== claseId
    );

    clase.cupos = clase.cupos + 1;

    await usuario.save();
    await clase.save();
    res.status(200).json({ mensaje: "Reserva cancelada correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al cancelar la reserva", error });
  }
});

module.exports = router;
