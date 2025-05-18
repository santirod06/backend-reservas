const express = require("express");
const mongoose = require("mongoose");

const UsuarioRoutes = require("./routes/UsuarioRoutes");
const ClaseRoutes = require("./routes/ClaseRoutes");
const ReservaRoutes = require("./routes/ReservaRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/miBaseDeDatos")
  .then(() => console.log("Se ha conectado exitosamente a mongodb"))
  .catch((error) => console.log("Ha ocurrido un error al conectar:", error));

app.use("/usuarios", UsuarioRoutes);
app.use("/clases", ClaseRoutes);
app.use("/reservas", ReservaRoutes);

app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
});
