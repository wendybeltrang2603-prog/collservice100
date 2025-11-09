import React, { useState } from "react";
import axios from "axios";

/**
 * Login recibe:
 * - setView(viewName) (función para cambiar la vista)
 * - setUser({ name, role, token }) (función para guardar el usuario en App)
 */
export default function Login({ setView, setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        correo: form.email,
        contrasena: form.password,
      });

      // Normalizar rol recibido del backend
      const rolRaw = res.data?.rol || "";
      const rol = rolRaw.toString().trim().toLowerCase();

      // Intentar extraer nombre real desde varias propiedades posibles del response
      const data = res.data || {};
      const maybeNameCandidates = [
        data.nombre,
        data.name,
        data.nombreUsuario,
        data.fullname,
        data.full_name,
        data.usuario?.nombre,
        data.usuario?.name,
        data.user?.name,
        data.user?.fullname,
        data.nombres,
      ];

      let userName = "";
      for (const c of maybeNameCandidates) {
        if (typeof c === "string" && c.trim()) {
          userName = c.trim();
          break;
        }
      }

      // fallback: si no hay nombre, usar la parte local del email (antes de @)
      if (!userName) {
        userName = (form.email || "").split("@")[0] || "Usuario";
      }

      // token opcional si tu backend lo devuelve
      const token = data.token || data.accessToken || "";

      // Guardar usuario en App (nombre y rol)
      const normalizedRole = rol.includes("admin")
        ? "admin"
        : rol.includes("emple")
        ? "empleado"
        : rol.includes("client")
        ? "cliente"
        : rol || "";

      if (typeof setUser === "function") {
        setUser({ name: userName, role: normalizedRole, token });
      }

      // Navegar según rol
      if (normalizedRole === "admin") {
        setView("admin");
      } else if (normalizedRole === "empleado") {
        setView("empleado");
      } else if (normalizedRole === "cliente") {
        setView("cliente");
      } else {
        alert("❌ Rol desconocido: " + rolRaw);
      }
    } catch (err) {
      alert("❌ " + (err.response?.data?.error || "Error al iniciar sesión"));
    }
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .page-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f6f5fc; font-family: "Segoe UI", Arial, sans-serif; }
        .login-container { background: white; padding: 35px 40px; border-radius: 16px; box-shadow: 0 6px 12px rgba(0,0,0,0.1); width: 380px; text-align: center; border-top: 6px solid #e76bb2; }
        .login-container h2 { margin-bottom: 20px; color: #e76bb2; font-size: 26px; font-weight: bold; }
        .input-group { margin-bottom: 18px; text-align: left; }
        .input-group label { display: block; font-size: 14px; margin-bottom: 6px; color: #444; }
        .input-group input { width: 100%; padding: 10px; border-radius: 10px; border: 1px solid #ccc; font-size: 14px; transition: border 0.3s; }
        .input-group input:focus { border-color: #a18cd1; outline: none; }
        .btn-login { width: 100%; padding: 12px; background: linear-gradient(90deg, #fbc2eb, #a18cd1); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: bold; cursor: pointer; transition: opacity 0.3s; margin-top: 10px; }
        .btn-login:hover { opacity: 0.9; }
        .extra { margin-top: 15px; font-size: 14px; color: #555; }
        .extra a { color: #e76bb2; text-decoration: none; font-weight: bold; }
        .extra a:hover { text-decoration: underline; }
      `}</style>

      <div className="page-container">
        <div className="login-container">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Ej: usuario@email.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Tu contraseña"
                required
              />
            </div>

            <button type="submit" className="btn-login">
              Ingresar
            </button>
          </form>

          <p className="extra">
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

          <p className="extra">
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
    </>
  );
}