import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatLauncher({ defaultEmployee }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const readUser = () => {
      try {
        const u = JSON.parse(localStorage.getItem("currentUser") || "null");
        setUser(u);
      } catch {
        setUser(null);
      }
    };
    readUser();
    // actualizar si cambia en otra pestaña
    const onStorage = (e) => { if (e.key === "currentUser") readUser(); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!user) return null; // no mostrar si no hay sesión

  const openChat = () => {
    // si quieres pasar un empleado concreto, usa defaultEmployee
    const employee = defaultEmployee || { id: "servicio", nombre: "Servicio de limpieza" };
    navigate("/chat", { state: { employee, role: "cliente" } });
  };

  return (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
      <button
        onClick={openChat}
        className="chat-launch-btn"
        style={{
          background: "#e76bb2",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: 18,
          cursor: "pointer",
          fontWeight: 700
        }}
        aria-label="Abrir chat"
      >
        Chat
      </button>
    </div>
  );
}