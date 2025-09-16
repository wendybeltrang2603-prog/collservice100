import React, { useState } from "react";

const RegistroCliente = ({ goBack }) => {
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aceptarTerminos) {
      alert("Debes aceptar los términos y condiciones ✅");
      return;
    }
    alert("Registro de cliente enviado ✅");
    // Aquí puedes agregar lógica para enviar los datos
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
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="apellido">Apellido</label>
            <input type="text" id="apellido" name="apellido" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="tipoDocumento">Tipo de Documento</label>
            <select id="tipoDocumento" name="tipoDocumento" style={styles.input} required>
              <option value="">Seleccione...</option>
              <option value="cc">Cédula de Ciudadanía</option>
              <option value="ti">Tarjeta de Identidad</option>
              <option value="ce">Cédula de Extranjería</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="numeroDocumento">Número de Documento</label>
            <input type="text" id="numeroDocumento" name="numeroDocumento" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input type="date" id="fechaNacimiento" name="fechaNacimiento" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="fechaExpedicion">Fecha de Expedición</label>
            <input type="date" id="fechaExpedicion" name="fechaExpedicion" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="direccion">Dirección</label>
            <input type="text" id="direccion" name="direccion" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="telefono">Teléfono</label>
            <input type="tel" id="telefono" name="telefono" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="correo">Correo</label>
            <input type="email" id="correo" name="correo" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="foto">Foto de Cédula</label>
            <input type="file" id="foto" name="foto" accept="image/*" style={styles.input} />
          </div>

          {/* ✅ Checkbox de aceptación de términos */}
          <div style={{ ...styles.inputGroup, flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
            <input
              type="checkbox"
              id="aceptarTerminos"
              checked={aceptarTerminos}
              onChange={(e) => setAceptarTerminos(e.target.checked)}
              style={{ marginRight: "8px" }}
              required
            />
            <label htmlFor="aceptarTerminos">
              Acepto los{" "}
              <a href="/terminos" target="_blank" style={{ color: "#4b2879", textDecoration: "underline" }}>
                Términos y Condiciones
              </a>
            </label>
          </div>

          <button type="submit" style={styles.button}>Registrar</button>
        </form>
      </div>
    </div>
  );
};

// 🎨 Estilos en JS (inline styles)
const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(180deg, #ffffffff, #ffffffff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    padding: "30px",
    color: "#222",
  },
  container: {
    background: "#f4e6ff",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(59, 5, 127, 0.6)",
    width: "380px",
    padding: "30px 25px",
    fontSize: "13px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: 600,
    color: "#4b2879",
  },
  inputGroup: {
    marginBottom: "14px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: 600,
    marginBottom: "4px",
    color: "#4b2879",
  },
  input: {
    padding: "7px 10px",
    borderRadius: "5px",
    border: "1px solid #7b68ee",
    fontSize: "13px",
  },
  button: {
    padding: "10px 15px",
    background: "#6d4ad9",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "8px",
    transition: "background 0.3s ease",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 20,
    background: "none",
    border: "none",
    color: "#a18cd1",
    fontSize: 22,
    cursor: "pointer",
    zIndex: 10,
  },
};

export default RegistroCliente;
