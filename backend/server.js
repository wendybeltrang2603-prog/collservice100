require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// Pool de conexiones a MySQL
// ==========================
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'collservice',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// ==========================
// Ruta de prueba
// ==========================
app.get('/api/ping', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ ok: true, db: rows[0].result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ==========================
// Registro de Administrador
// ==========================
app.post('/api/administradores/registro', async (req, res) => {
  try {
    const { nombre, apellido, usuario, correo, telefono, rol, direccion, contrasena } = req.body;

    if (!usuario || !nombre || !correo || !contrasena) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (usuario, nombre, correo, contrasena).' });
    }

    const hashed = await bcrypt.hash(contrasena, 10);

    const sql = `
      INSERT INTO administrador (
        documento_admin,
        nombre_admin,
        apellido_admin,
        telefono_admin,
        direccion_admin,
        nivel_acceso,
        correo_admin,
        contraseña_admin
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(sql, [
      usuario,
      nombre,
      apellido || null,
      telefono || null,
      direccion || null,
      rol || 'basico',
      correo,
      hashed
    ]);

    return res.json({ mensaje: 'Administrador registrado con éxito ✅' });
  } catch (err) {
    console.error('ERROR DETALLADO:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Documento o correo ya registrado' });
    }
    return res.status(500).json({ error: err.message });
  }
});

// ==========================
// Registro de Cliente
// ==========================
app.post('/api/clientes/registro', async (req, res) => {
  try {
    const {
      documento_cliente,
      nombre_cliente,
      apellido_cliente,
      direccion_cliente,
      telefono_cliente,
      correo_cliente,
      contrasena,
      historial_servicios
    } = req.body;

    if (!documento_cliente || !nombre_cliente || !correo_cliente || !contrasena) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (documento, nombre, correo, contrasena).' });
    }

    const hashed = await bcrypt.hash(contrasena, 10);

    const sql = `
      INSERT INTO cliente (
        documento_cliente,
        nombre_cliente,
        apellido_cliente,
        direccion_cliente,
        telefono_cliente,
        correo_cliente,
        contrasena,
        historial_servicios
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(sql, [
      documento_cliente,
      nombre_cliente,
      apellido_cliente || null,
      direccion_cliente || null,
      telefono_cliente || null,
      correo_cliente,
      hashed,
      historial_servicios || null
    ]);

    return res.json({ mensaje: 'Cliente registrado con éxito ✅' });
  } catch (err) {
    console.error('ERROR DETALLADO:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Documento o correo ya registrado' });
    }
    return res.status(500).json({ error: err.message });
  }
});

// ==========================
// Registro de Empleado
// ==========================
app.post('/api/empleadas/registro', async (req, res) => {
  try {
    const {
      documento_empleado,
      nombre_empleado,
      apellido_empleado,
      telefono_empleado,
      direccion_empleado,
      perfil_laboral,
      experiencia_laboral,
      servicios_realizados,
      disponibilidad,
      correo_empleado,
      contrasena_empleado
    } = req.body;

    if (!documento_empleado || !nombre_empleado || !apellido_empleado || !correo_empleado || !contrasena_empleado) {
      return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    const hashed = await bcrypt.hash(contrasena_empleado, 10);

    const sql = `
      INSERT INTO empleado (
        documento_empleado,
        nombre_empleado,
        apellido_empleado,
        telefono_empleado,
        direccion_empleado,
        perfil_laboral,
        experiencia_laboral,
        servicios_realizados,
        disponibilidad,
        correo_empleado,
        contrasena_empleado
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(sql, [
      documento_empleado,
      nombre_empleado,
      apellido_empleado,
      telefono_empleado || null,
      direccion_empleado || null,
      perfil_laboral || null,
      experiencia_laboral || null,
      servicios_realizados || null,
      disponibilidad || null,
      correo_empleado,
      hashed
    ]);

    res.json({ mensaje: 'Empleado registrado con éxito ✅' });

  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Documento o correo ya registrado' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// ==========================
// Iniciar servidor
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
