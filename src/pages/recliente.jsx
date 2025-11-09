import React, { useState } from "react";
import axios from "axios";

const RegistroCliente = ({ goBack }) => {
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    documento_cliente: "",
    nombre_cliente: "",
    apellido_cliente: "",
    direccion_cliente: "",
    telefono_cliente: "",
    correo_cliente: "",
    contrasena: "",
    historial_servicios: "" // opcional
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aceptarTerminos) {
      alert("Debes aceptar los términos y condiciones ✅");
      return;
    }

    if (form.contrasena.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/clientes/registro", form, {
        headers: { "Content-Type": "application/json" }
      });
      alert(res.data.mensaje || "Registrado");
      // Limpiar formulario
      setForm({
        documento_cliente: "",
        nombre_cliente: "",
        apellido_cliente: "",
        direccion_cliente: "",
        telefono_cliente: "",
        correo_cliente: "",
        contrasena: "",
        historial_servicios: ""
      });
      setAceptarTerminos(false);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.error || "Error al registrar cliente";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={{ ...styles.container, position: "relative" }}>
        {goBack && (
          <button onClick={goBack} style={styles.backButton} title="Atrás">
            ←
          </button>
        )}

        <h2 style={styles.title}>Registro de Cliente</h2>
        <form onSubmit={handleSubmit}>
          {/* Documento */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Documento</label>
            <input type="text" name="documento_cliente" value={form.documento_cliente} onChange={handleChange} style={styles.input} required />
          </div>

          {/* Nombre */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre</label>
            <input type="text" name="nombre_cliente" value={form.nombre_cliente} onChange={handleChange} style={styles.input} required />
          </div>

          {/* Apellido */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Apellido</label>
            <input type="text" name="apellido_cliente" value={form.apellido_cliente} onChange={handleChange} style={styles.input} />
          </div>

          {/* Dirección */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Dirección</label>
            <input type="text" name="direccion_cliente" value={form.direccion_cliente} onChange={handleChange} style={styles.input} />
          </div>

          {/* Teléfono */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Teléfono</label>
            <input type="tel" name="telefono_cliente" value={form.telefono_cliente} onChange={handleChange} style={styles.input} />
          </div>

          {/* Correo */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo</label>
            <input type="email" name="correo_cliente" value={form.correo_cliente} onChange={handleChange} style={styles.input} required />
          </div>

          {/* Contraseña */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange} style={styles.input} required />
          </div>

          {/* Historial (opcional) */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Historial (opcional)</label>
            <input type="text" name="historial_servicios" value={form.historial_servicios} onChange={handleChange} style={styles.input} />
          </div>

          {/* Términos */}
          <div style={{ ...styles.inputGroup, flexDirection: "row", alignItems: "center" }}>
            <input type="checkbox" checked={aceptarTerminos} onChange={(e) => setAceptarTerminos(e.target.checked)} style={{ marginRight: 8 }} required />
            <label>Acepto los <a href="/terminos" target="_blank" rel="noreferrer">Términos y Condiciones</a></label>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  body: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", padding: "30px" },
  container: { background: "#f4e6ff", borderRadius: 12, boxShadow: "0 0 20px rgba(59,5,127,0.12)", width: 380, padding: 24 },
  title: { textAlign: "center", marginBottom: 16, color: "#4b2879" },
  inputGroup: { marginBottom: 12, display: "flex", flexDirection: "column" },
  label: { fontWeight: 600, marginBottom: 6, color: "#4b2879" },
  input: { padding: 8, borderRadius: 6, border: "1px solid #7b68ee" },
  button: { padding: "10px 14px", background: "#6d4ad9", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, cursor: "pointer" },
  backButton: { position: "absolute", left: 16, top: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#a18cd1" }
};

export default RegistroCliente;