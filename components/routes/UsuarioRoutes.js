const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

// Endpoint para crear un nuevo usuario
router.post("/registrar", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Para obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const mostrarUsuarios = await Usuario.find();
    res.status(200).json(mostrarUsuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Para obtener un usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const mostrarUsuario = await Usuario.findById(req.params.id);

    if (!mostrarUsuario) {
      return res.status(404), json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(mostrarUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un usuario por ID
router.put("/:id", async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res
      .status(200)
      .json({ mensaje: "Usuario eliminado correctamente", usuarioEliminado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
