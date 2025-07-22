# Reservacion de clases API

Este proyecto es una **API RESTful** desarrollada con **Node.js**, **Express** y **MongoDB**, que permite gestionar usuarios, clases y sus respectivas reservas. 
Está pensada como parte del backend de una aplicación de reservas para gimnasios, academias o centros educativos.


<br>


## 🚀 Funcionalidades principales

- ✔️ CRUD completo para **Usuarios**
- ✔️ CRUD completo para **Clases**
- ✔️ Relación entre ambos: **Usuarios pueden reservar clases** (CRUD para **Reservas**)
- ✔️ Validaciones de cupos, reservas duplicadas y cancelación de reservas
- ✔️ Base de datos persistente usando **MongoDB + Mongoose**


<br>


## 🛠️ Tecnologías utilizadas

- **Node.js** + **Express** para la API
- **MongoDB** como base de datos NoSQL
- **Mongoose** para el modelado de datos
- **Postman** para probar los endpoints


<br>


## 📁 Estructura del proyecto
```
components/
├── routes/
│ ├── UsuarioRoutes.js
│ ├── ClaseRoutes.js
│ └── ReservaRoutes.js
├── models/
│ ├── Usuario.js
│ ├── Clase.js
│ └── Reserva.js
├── server.js
```


<br>


## 📬 Endpoints principales

### 🔹 Usuario

- `POST /usuarios/registrar` → Crear un usuario 
- `GET /usuarios` → Obtener todos  
- `GET /usuarios/:id` → Obtener por ID
- `PUT /usuarios/:id` → Editar usuario por ID 
- `DELETE /usuarios/:id` → Borrar usuario por ID

### 🔹 Clase

- `POST /clases/crear` → Crear clase  
- `GET /clases` → Ver clases disponibles  
- `GET /clases/:id` → Ver clase por ID
- `PUT /clases/:id` → Editar clase  
- `DELETE /clases/:id` → Eliminar clase por ID

### 🔹 Reservas

- `POST /reservar` → Reservar clase 
- `GET /reservas/:usuarioId` → Ver clases reservadas de un usuario  
- `DELETE /cancelar-reserva/:usuarioId/:claseId` → Cancelar una reserva por ID


<br>


## Como usar este backend

1. **Clonar el repositorio**
   
   ```
   git clone https://github.com/santirod06/backend-reservas.git
   cd backend-reservas
   ```

2. **Instalar las dependencias**

   ```
   cd components
   npm install
   ```

3. **Correr el servidor**

   ```
   node server.js
   ```
   
