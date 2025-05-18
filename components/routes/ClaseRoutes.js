const express = require("express");
const router = express.Router();
const Clase = require("../models/Clase");

// Endpoint para crear una nueva clase 
router.post("/crear", async (req, res) => {
  try {
    const nuevaClase = new Clase(req.body);
    await nuevaClase.save();
    res.status(201).json(nuevaClase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Para obtener todos las clases 
router.get("/", async (req, res) => {
  try {
    const clases = await Clase.find();
    res.status(200).json(clases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Para obtener una clase especifica por su ID
router.get("/:id", async (req, res) => {
  try {
    const clase = await Clase.findById(req.params.id);

    if (!clase) {
      return res.status(404).json({ mensaje: "Clase no encontrada" });
    }

    res.status(200).json(clase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para actualizar una clase segun su id (metodo PUT)
router.put("/:id", async (req, res) => {
  try {
    const claseActualizada = await Clase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // para que devuelva el documento actualizado cuando hagamos el res, en lugar del viejo
    );

    if (!claseActualizada) {
      return res.status(404).json({ mensaje: "Clase no encontrada" });
    }

    res.status(200).json(claseActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para eliminar una clase segun su id (metodo DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const claseEliminada = await Clase.findByIdAndDelete(req.params.id);

    if (!claseEliminada) {
      return res.status(404).json({ mensaje: "Clase no encontrada" });
    }
    res.status(200).json(claseEliminada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
