import React, { useState } from "react";

export default function Login({ setView, goBack }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔑 Validaciones de inicio de sesión
    if (form.email === "evelynarango1220@gmail.com") {
      setView("cliente"); // cliente.jsx
    } else if (
      form.email === "empleada@collservice.com" &&
      form.password === "empleada123"
    ) {
      setView("empleado"); // empleado.jsx
    } else if (
      form.email === "admin@collservice.com" &&
      form.password === "admin123"
    ) {
      setView("admin"); // admin.jsx
    } else {
      alert("❌ Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="page-container" style={styles.page}>
      <div className="login-container" style={styles.container}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group" style={styles.group}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ej: usuario@email.com"
              required
              style={styles.input}
            />
          </div>

          <div className="input-group" style={styles.group}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.btn}>
            Ingresar
          </button>
        </form>

        <p style={styles.extra}>
          ¿Olvidaste tu contraseña?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setView("recuperar");
            }}
          >
            Recupérala aquí
          </a>
        </p>

        <p style={styles.extra}>
          ¿No tienes cuenta?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setView("registro");
            }}
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f6f5fc",
    fontFamily: "Segoe UI, Arial, sans-serif",
  },
  container: {
    background: "white",
    padding: "35px 40px",
    borderRadius: "16px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    width: "380px",
    textAlign: "center",
    borderTop: "6px solid #e76bb2",
  },
  title: {
    marginBottom: "20px",
    color: "#e76bb2",
    fontSize: "26px",
    fontWeight: "bold",
  },
  group: { marginBottom: "18px", textAlign: "left" },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #fbc2eb, #a18cd1)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  extra: { marginTop: "15px", fontSize: "14px", color: "#555" },
};
