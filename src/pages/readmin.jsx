import React, { useState } from "react";
import axios from "axios";

export default function RegistroAdministrador({ goBack }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    usuario_admin: "",
    contrasena: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validación mínima en cliente (HTML required ya cubre lo esencial)
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/administradores/registro", form, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000
      });
      alert(res.data?.mensaje || "Administrador registrado");
      setForm({ nombre: "", correo: "", telefono: "", usuario_admin: "", contrasena: "" });
      if (typeof goBack === "function") goBack();
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.error || "Error al registrar administrador";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={{ ...styles.container, position: "relative" }}>
        {goBack && (
          <button onClick={goBack} style={styles.backButton} title="Atrás">←</button>
        )}

        <h2 style={styles.title}>Registro Administrador</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre completo</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo</label>
            <input name="correo" type="email" value={form.correo} onChange={handleChange} style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Teléfono (opcional)</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuario (ID)</label>
            <input name="usuario_admin" value={form.usuario_admin} onChange={handleChange} style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input name="contrasena" type="password" value={form.contrasena} onChange={handleChange} style={styles.input} required />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Registrando..." : "Registrar administrador"}
            </button>
            <button type="button" onClick={() => (typeof goBack === "function" ? goBack() : null)} style={styles.cancelButton}>
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  body: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", padding: "30px" },
  container: { background: "#fff7fb", borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.06)", width: 520, padding: 24 },
  title: { textAlign: "center", marginBottom: 12, color: "#8a3fa6" },
  inputGroup: { marginBottom: 12, display: "flex", flexDirection: "column" },
  label: { fontWeight: 600, marginBottom: 6, color: "#5c2b8a" },
  input: { padding: 10, borderRadius: 8, border: "1px solid #d7c6f4" },
  button: { padding: "10px 16px", background: "#a65bd6", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", flex: 1 },
  cancelButton: { padding: "10px 16px", background: "#fff", color: "#444", border: "1px solid #ddd", borderRadius: 10, cursor: "pointer" },
  backButton: { position: "absolute", left: 16, top: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#a18cd1" }
};