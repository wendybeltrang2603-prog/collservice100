const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // tu contraseña MySQL
  database: "collservice", // tu BD
});

db.connect((err) => {
  if (err) console.error("Error de conexión:", err);
  else console.log("Conectado a MySQL");
});

// Ruta para registrar cliente
app.post("/api/clientes/registro", async (req, res) => {
  const { nombre_cliente, apellido_cliente, direccion_cliente, telefono_cliente, correo_cliente, contrasena, historial_servicios } = req.body;

  if (!nombre_cliente || !apellido_cliente || !direccion_cliente || !telefono_cliente || !correo_cliente || !contrasena) {
    return res.status(400).json({ error: "Faltan campos por completar" });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const sql = `
      INSERT INTO cliente
      (nombre_cliente, apellido_cliente, direccion_cliente, telefono_cliente, correo_cliente, contrasena, historial_servicios)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [nombre_cliente, apellido_cliente, direccion_cliente, telefono_cliente, correo_cliente, hashedPassword, historial_servicios || ""], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al registrar cliente" });
      }
      res.json({ mensaje: "Cliente registrado correctamente" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
