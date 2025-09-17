import React, { useState, useEffect } from "react";

// Importa todas las páginas/vistas que usarás
import Login from "./pages/login.jsx";
import Terminos from "./pages/terminos.jsx";
import Privacidad from "./pages/privacidad.jsx";
import DatosPersonales from "./pages/datos.jsx";
import RegistroEmpleado from "./pages/registro.jsx";
import RegistroCliente from "./pages/cliente.jsx";
import Cliente from "./pages/cliente.jsx";
import Admin from "./pages/admin.jsx";
import Empleado from "./pages/empleado.jsx";
import Nosotros from "./pages/nosotros.jsx";
import ContactoEmpresaInfo from "./pages/contacto.jsx";
import RecuperarContrasena from "./pages/recuperarContrasena.jsx";

// 👉 Nuevo componente Servicios
function Servicios({ goBack }) {
  return (
    <section style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "16px" }}>
        Nuestros Servicios
      </h2>
      <p style={{ marginBottom: "20px", fontSize: "16px" }}>
        Ofrecemos limpieza de hogares, oficinas, organización de espacios y
        mantenimiento general.
      </p>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "15px",
          listStyle: "none",
          padding: 0,
        }}
      >
        <li style={servicioStyle}>🧹 Limpieza general</li>
        <li style={servicioStyle}>🧺 Lavandería</li>
        <li style={servicioStyle}>🍲 Preparación de alimentos</li>
        <li style={servicioStyle}>👵 Cuidado de adultos mayores</li>
        <li style={servicioStyle}>👶 Niñera</li>
        <li style={servicioStyle}>🐶 Cuidado canino</li>
        <li style={servicioStyle}>🌳 Mantenimiento de jardines y áreas verdes</li>
        <li style={servicioStyle}>🗄️ Organización de armarios o bodegas</li>
        <li style={servicioStyle}>🛒 Compras y mandados</li>
        <li style={servicioStyle}>♿ Cuidado a personas con discapacidad</li>
        <li style={servicioStyle}>🎉 Limpieza después de eventos o fiestas</li>
        <li style={servicioStyle}>🚗 Limpieza y mantenimiento de vehículos</li>
      </ul>
      {goBack && (
        <button
          onClick={goBack}
          style={{
            marginTop: "20px",
            background: "#ecafd2ff",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ⬅ Volver
        </button>
      )}
    </section>
  );
}

const servicioStyle = {
  background: "#ffe4ec",
  padding: "14px",
  borderRadius: "12px",
  boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
  fontWeight: "500",
  textAlign: "center",
};

function App() {
  const [view, setView] = useState("inicio");
  const [history, setHistory] = useState([]);
  const [rol, setRol] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const goToView = (v) => {
    setHistory((h) => [...h, view]);
    setView(v);
  };

  const goBack = () => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setView(prev);
      return h.slice(0, -1);
    });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const carruselImgs = [
    { src: "/lav.png", alt: "Empleada limpiando cocina", texto: "Limpieza de cocinas y baños" },
    { src: "/can.png", alt: "Empleada con productos de limpieza", texto: "Personal capacitado y amable" },
    { src: "/nin.png", alt: "Empleada cuidando niños", texto: "Cuidado y confianza para tu familia" },
  ];
  const [carruselIdx, setCarruselIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCarruselIdx((i) => (i + 1) % carruselImgs.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const headerStyle = {
    background: "linear-gradient(90deg, #fbc2eb, #4c3575)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 30px",
    flexWrap: "wrap",
    ...(isMobile ? { flexDirection: "column", alignItems: "flex-start", padding: "14px 20px" } : {}),
  };
  const logoStyle = { fontSize: "22px", fontWeight: "bold", marginBottom: isMobile ? "10px" : "0" };

  const menuStyle = {
    listStyle: "none",
    display: "flex",
    gap: "25px",
    margin: 0,
    padding: 0,
    flexWrap: "wrap",
  };
  const menuLinkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    cursor: "pointer",
    transition: "color 0.3s",
  };

  const accionesStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: isMobile ? "12px" : "0px",
  };
  const btnStyle = {
    background: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    transition: "background 0.3s",
  };
  const buscarBtnStyle = {
    background: "#ff69b4",
    border: "none",
    padding: "6px 12px",
    borderRadius: "20px",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
  };
  const inputStyle = {
    padding: "6px 12px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    fontSize: "14px",
    minWidth: isMobile ? "100%" : "150px",
    marginBottom: isMobile ? "8px" : "0px",
  };

  const footerStyle = {
    background: "linear-gradient(90deg, #fbc2eb, #4c3575)",
    color: "white",
    padding: "30px 20px",
    textAlign: "center",
    marginTop: "60px",
  };
  const linkFooterStyle = {
    color: "white",
    textDecoration: "underline",
    cursor: "pointer",
    margin: "0 8px",
  };

  const renderView = () => {
    switch (view) {
      case "login":
        return (
          <Login
            setView={(v) => {
              goToView(v);   // ✅ aquí es donde cambia la vista
              if (v === "admin") setRol("Administrador");
              else if (v === "empleado") setRol("Empleada");
              else if (v === "cliente") setRol("Cliente");
              else setRol("");
            }}
            goBack={goBack}
          />
        );
      case "recuperar":
        return <RecuperarContrasena setView={goToView} goBack={goBack} />;
      case "registro":
        return <RegistroEmpleado goBack={goBack} />;
      case "recliente":
        return <RegistroCliente goBack={goBack} />;
      case "cliente":
        return <Cliente goBack={goBack} />;
      case "empleado":
        return <Empleado goBack={goBack} />;
      case "admin":
        return <Admin goBack={goBack} />;
      case "servicios":
        return <Servicios goBack={goBack} />; {/* ✅ Ahora integrado */}
      case "nosotros":
        return <Nosotros goBack={goBack} />;
      case "contacto":
        return <ContactoEmpresaInfo goBack={goBack} />;
      case "terminos":
        return <Terminos goBack={goBack} />;
      case "privacidad":
        return <Privacidad goBack={goBack} />;
      case "datos":
        return <DatosPersonales goBack={goBack} />;
      default:
        return (
          <>
            {/* Pantalla Inicio */}
            <section style={{ textAlign: "center", margin: "50px auto 30px", padding: isMobile ? "0 15px" : "0" }}>
              <h1 style={{ fontSize: "30px", color: "#e76bb2", marginBottom: "15px" }}>
                Bienvenido a Coll Service
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  background: "#f1f2f7",
                  display: "inline-block",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  color: "#444",
                  maxWidth: isMobile ? "90%" : "600px",
                }}
              >
                Tu tranquilidad y limpieza en manos expertas. ¡Confía en nosotros para tu hogar u oficina!
              </p>
            </section>

            {/* Carrusel */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 40 }}>
              <div
                style={{
                  position: "relative",
                  width: 320,
                  height: 200,
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(76,53,117,0.13)",
                  background: "#fff",
                }}
              >
                <img
                  src={carruselImgs[carruselIdx].src}
                  alt={carruselImgs[carruselIdx].alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.7s" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "rgba(76,53,117,0.7)",
                    color: "white",
                    padding: "10px 0",
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: 17,
                  }}
                >
                  {carruselImgs[carruselIdx].texto}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                {carruselImgs.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: i === carruselIdx ? "#e76bb2" : "#ddd",
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div style={{ fontFamily: '"Segoe UI", Arial, sans-serif', backgroundColor: "#f6f5fc", color: "#333", lineHeight: "1.5" }}>
      <header style={headerStyle}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            goToView("inicio");
            setRol("");
          }}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", marginBottom: isMobile ? "12px" : "0" }}
        >
          <img src="/logo.png.png" alt="Coll Service Logo" style={{ height: "80px", marginRight: 10, cursor: "pointer" }} />
          <span style={{ ...logoStyle, color: "#fff", letterSpacing: "1.5px" }}>COLL SERVICE</span>
        </a>
        <ul style={menuStyle}>
          <li><a style={menuLinkStyle} onClick={() => goToView("inicio")}>Inicio</a></li>
          
        </ul>
        <div style={accionesStyle}>
          {rol ? (
            <>
              <span style={{ color: "#fff", fontWeight: 600, background: "#e76bb2", borderRadius: 8, padding: "6px 16px", fontSize: 15, marginRight: 12 }}>
                Bienvenido {rol}
              </span>
              <button
                style={{ ...btnStyle, background: "#e76bb2", color: "white" }}
                onClick={() => {
                  goToView("inicio");
                  setRol("");
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button style={btnStyle} onClick={() => { goToView("login"); setRol(""); }}>Iniciar sesión</button>
          )}
          <button style={btnStyle} onClick={() => { goToView("registro"); setRol(""); }}>Registro </button>
         
         
        </div>
      </header>

      <main>{renderView()}</main>

      <footer style={footerStyle}>
        <div style={{ marginBottom: "20px" }}>
          
          <a style={linkFooterStyle} onClick={() => goToView("terminos")}>Términos y Condiciones</a> |
          <a style={linkFooterStyle} onClick={() => goToView("privacidad")}>Política de Privacidad</a> |
          <a style={linkFooterStyle} onClick={() => goToView("contacto")}>Contacto</a> |
          <a style={linkFooterStyle} onClick={() => goToView("nosotros")}>Nosotros</a> |
          <a style={linkFooterStyle} onClick={() => goToView("servicios")}>Servicios</a>

        </div>
        <div style={{ fontWeight: "500", fontSize: "16px" }}>
          © {new Date().getFullYear()} Coll Service. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

export default App;