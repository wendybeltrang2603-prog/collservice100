import { useState } from "react";
import RegistroCliente from "./recliente";
import RegistroAdministrador from "./readmin";
import RegistroEmpleada from "./reempleada";

export default function RegistroEmpleado({ goBack }) {
  const [rol, setRol] = useState("");

  if (!rol) {
    return (
      <div style={styles.body}>
        <div style={styles.container}>
          {goBack && (
            <button
              onClick={goBack}
              style={styles.backButton}
              title="Atrás"
            >
              ←
            </button>
          )}
          <h2 style={styles.title}>Selecciona el tipo de registro</h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Rol de registro</label>
            <select
              name="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              style={styles.select}
            >
              <option value="">Seleccione un rol</option>
              <option value="administrador">Administrador</option>
              <option value="cliente">Cliente</option>
              <option value="empleada">Empleada</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  // 👉 Renderiza el formulario según el rol
  if (rol === "cliente") {
    return <RegistroCliente goBack={() => setRol("")} />;
  }

  if (rol === "administrador") {
    return <RegistroAdministrador goBack={() => setRol("")} />;
  }

  if (rol === "empleada") {
    return <RegistroEmpleada goBack={() => setRol("")} />;
  }

  return null;
}

// 🎨 Estilos
const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(180deg, #ffffffff, #ffffffff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // 👈 cambiamos de center a flex-start
    minHeight: "100vh",
    padding: "20px",
    paddingTop: "60px", // 👈 sube el contenedor hacia arriba
    color: "#222",
  },
  container: {
    background: "#ffffffff",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(59, 5, 127, 0.5)",
    width: "380px",
    padding: "30px 25px",
    position: "relative",
    textAlign: "center",
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
  },
  title: {
    fontWeight: 600,
    marginBottom: "25px",
    color: "#e76bb2",
  },
  inputGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  label: {
    fontWeight: 600,
    marginBottom: "6px",
    color: "#e76bb2",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #7b68ee",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
  },
};
