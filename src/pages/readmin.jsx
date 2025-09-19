import { useState } from "react";
import axios from "axios";

function RegistroAdministrador({ goBack }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    correo: "",
    telefono: "",
    nivel_acceso: "",  // cambiado de rol → nivel_acceso
    contraseña: "",
    confirmarContraseña: "",
  });

  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aceptarTerminos) {
      alert("Debes aceptar los términos y condiciones ✅");
      return;
    }

    if (form.contraseña !== form.confirmarContraseña) {
      alert("⚠️ Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/administradores/registro", {
        nombre: form.nombre,
        apellido: form.apellido,
        usuario: form.usuario,
        correo: form.correo,
        telefono: form.telefono,
        direccion: "",
        contrasena: form.contraseña,
        nivel_acceso: form.nivel_acceso, // lo mandamos pero backend lo ignora
      });

      alert(res.data.mensaje);

      setForm({
        nombre: "",
        apellido: "",
        usuario: "",
        correo: "",
        telefono: "",
        nivel_acceso: "",
        contraseña: "",
        confirmarContraseña: "",
      });
      setAceptarTerminos(false);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        alert("❌ " + err.response.data.error);
      } else {
        alert("❌ Error al conectar con el servidor");
      }
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

        <h2 style={styles.title}>Registro de Administrador</h2>

        <form onSubmit={handleSubmit}>
          {["nombre", "apellido", "usuario", "correo", "telefono", "contraseña", "confirmarContraseña"].map((field) => (
            <div style={styles.inputGroup} key={field}>
              <label style={styles.label}>
                {field === "usuario"
                  ? "Usuario"
                  : field === "contraseña"
                  ? "Contraseña"
                  : field === "confirmarContraseña"
                  ? "Confirmar Contraseña"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field.includes("contraseña") ? "password" : field === "correo" ? "email" : field === "telefono" ? "tel" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          ))}

          {/* Nivel de acceso (solo visual, backend fuerza admin) */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nivel de Acceso</label>
            <select
              name="nivel_acceso"
              value={form.nivel_acceso}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Seleccione nivel de acceso</option>
              <option value="superadmin">Super Administrador</option>
              <option value="rrhh">Recursos Humanos</option>
              <option value="soporte">Soporte Técnico</option>
            </select>
          </div>

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

          <button type="submit" style={styles.button}>
            Registrar Administrador
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(180deg, #fefefe, #fefefe)",
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
    width: "100%",
    maxWidth: "400px",
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
