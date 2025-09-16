import { useState } from "react";

function RegistroAdministrador({ goBack }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    correo: "",
    telefono: "",
    rol: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!aceptarTerminos) {
      alert("Debes aceptar los términos y condiciones ✅");
      return;
    }

    if (form.contraseña !== form.confirmarContraseña) {
      alert("⚠️ Las contraseñas no coinciden");
      return;
    }

    alert("Administrador registrado:\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div style={styles.body}>
      <div style={{ ...styles.container, position: "relative" }}>
        {goBack && (
          <button onClick={goBack} style={styles.backButton} title="Atrás">
            ←
          </button>
        )}

        <h2 style={styles.title}>Registro de Administrador</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Apellido</label>
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuario</label>
            <input
              type="text"
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Rol</label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="superadmin">Super Administrador</option>
              <option value="rrhh">Recursos Humanos</option>
              <option value="soporte">Soporte Técnico</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              name="contraseña"
              value={form.contraseña}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmarContraseña"
              value={form.confirmarContraseña}
              onChange={handleChange}
              style={styles.input}
              required
            />
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

          <button type="submit" style={styles.button}>Registrar Administrador</button>
        </form>
      </div>
    </div>
  );
}

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

export default RegistroAdministrador;
