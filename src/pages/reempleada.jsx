import { useState } from "react";

export default function RegistroEmpleada({ goBack }) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    documento_empleado: "",
    nombre_empleado: "",
    apellido_empleado: "",
    correo_empleado: "",
    contrasena_empleado: "",
    telefono_empleado: "",
    direccion_empleado: "",
    perfil_laboral: "",
    experiencia_laboral: "",
    servicios: {
      limpieza: false,
      lavanderia: false,
      preparacionAlimentos: false,
      cuidadoAdultos: false,
      ninera: false,
      cuidadoCanino: false,
    },
    disponibilidad: "",
    
    aceptarTerminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name !== "aceptarTerminos") {
      setForm((prev) => ({
        ...prev,
        servicios: { ...prev.servicios, [name]: checked },
      }));
    } else if (type === "checkbox" && name === "aceptarTerminos") {
      setForm((prev) => ({ ...prev, aceptarTerminos: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.aceptarTerminos) {
      alert("Debes aceptar los términos y condiciones ✅");
      return;
    }

    const serviciosSeleccionados = Object.entries(form.servicios)
      .filter(([_, val]) => val)
      .map(([key]) => key)
      .join(", ");

    const payload = {
      documento_empleado: form.documento_empleado,
      nombre_empleado: form.nombre_empleado,
      apellido_empleado: form.apellido_empleado,
      correo_empleado: form.correo_empleado,
      contrasena_empleado: form.contrasena_empleado,
      telefono_empleado: form.telefono_empleado,
      direccion_empleado: form.direccion_empleado,
      perfil_laboral: form.perfil_laboral,
      experiencia_laboral: form.experiencia_laboral,
      servicios_realizados: serviciosSeleccionados,
      disponibilidad: form.disponibilidad,
      // 👇 ya no pedimos "rol" porque el backend lo pone automático
    };

    try {
      const res = await fetch("http://localhost:5000/api/empleadas/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.mensaje);
        setForm({
          documento_empleado: "",
          nombre_empleado: "",
          apellido_empleado: "",
          correo_empleado: "",
          contrasena_empleado: "",
          telefono_empleado: "",
          direccion_empleado: "",
          perfil_laboral: "",
          experiencia_laboral: "",
          servicios: {
            limpieza: false,
            lavanderia: false,
            preparacionAlimentos: false,
            cuidadoAdultos: false,
            ninera: false,
            cuidadoCanino: false,
          },
          disponibilidad: "",
          aceptarTerminos: false,
        });
        setStep(1);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error al registrar la empleada");
    }
  };

  const canGoNext = () => {
    if (step === 1) {
      return (
        form.documento_empleado &&
        form.nombre_empleado &&
        form.apellido_empleado &&
        form.correo_empleado &&
        form.contrasena_empleado
      );
    }
    if (step === 2) return true;
    if (step === 3) return form.aceptarTerminos;
    return false;
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {goBack && (
          <button onClick={goBack} style={styles.backButton}>
            ←
          </button>
        )}
        <h2 style={styles.title}>Registro Empleada - Paso {step} de 3</h2>
        <form onSubmit={handleSubmit}>
          {/* PASO 1 */}
          {step === 1 && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Documento</label>
                <input
                  style={styles.input}
                  name="documento_empleado"
                  value={form.documento_empleado}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nombre</label>
                <input
                  style={styles.input}
                  name="nombre_empleado"
                  value={form.nombre_empleado}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Apellido</label>
                <input
                  style={styles.input}
                  name="apellido_empleado"
                  value={form.apellido_empleado}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Correo</label>
                <input
                  style={styles.input}
                  type="email"
                  name="correo_empleado"
                  value={form.correo_empleado}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Contraseña</label>
                <input
                  style={styles.input}
                  type="password"
                  name="contrasena_empleado"
                  value={form.contrasena_empleado}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Teléfono</label>
                <input
                  style={styles.input}
                  name="telefono_empleado"
                  value={form.telefono_empleado}
                  onChange={handleChange}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Dirección</label>
                <input
                  style={styles.input}
                  name="direccion_empleado"
                  value={form.direccion_empleado}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* PASO 2 */}
          {step === 2 && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Perfil Laboral</label>
                <textarea
                  style={styles.input}
                  name="perfil_laboral"
                  value={form.perfil_laboral}
                  onChange={handleChange}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Experiencia Laboral</label>
                <textarea
                  style={styles.input}
                  name="experiencia_laboral"
                  value={form.experiencia_laboral}
                  onChange={handleChange}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Servicios</label>
                {Object.keys(form.servicios).map((s) => (
                  <label key={s} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      name={s}
                      checked={form.servicios[s]}
                      onChange={handleChange}
                      style={{ marginRight: "6px" }}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </>
          )}

          {/* PASO 3 */}
          {step === 3 && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Disponibilidad</label>
                <textarea
                  style={styles.input}
                  name="disponibilidad"
                  value={form.disponibilidad}
                  onChange={handleChange}
                />
              </div>
              <div style={{ ...styles.inputGroup, flexDirection: "row", alignItems: "center" }}>
                <input
                  type="checkbox"
                  name="aceptarTerminos"
                  checked={form.aceptarTerminos}
                  onChange={handleChange}
                  style={{ marginRight: "8px" }}
                />
                <label>
                  Acepto los{" "}
                  <a
                    href="/terminos"
                    target="_blank"
                    style={{ color: "#4b2879", textDecoration: "underline" }}
                  >
                    Términos y Condiciones
                  </a>
                </label>
              </div>
            </>
          )}

          {/* Botones */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            {step > 1 && (
              <button type="button" style={styles.button} onClick={() => setStep(step - 1)}>
                Anterior
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                style={{ ...styles.button, opacity: canGoNext() ? 1 : 0.5 }}
                onClick={() => canGoNext() && setStep(step + 1)}
                disabled={!canGoNext()}
              >
                Siguiente
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                style={{ ...styles.button, opacity: canGoNext() ? 1 : 0.5 }}
                disabled={!canGoNext()}
              >
                Finalizar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================
// Estilos
// ==========================
const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
    position: "relative",
  },
  title: { textAlign: "center", marginBottom: "20px", fontWeight: 600, color: "#4b2879" },
  inputGroup: { marginBottom: "14px", display: "flex", flexDirection: "column" },
  label: { fontWeight: 600, marginBottom: "4px", color: "#4b2879" },
  input: { padding: "7px 10px", borderRadius: "5px", border: "1px solid #7b68ee", fontSize: "13px", width: "100%" },
  button: { padding: "10px 15px", background: "#6d4ad9", border: "none", borderRadius: "6px", color: "white", fontWeight: 700, cursor: "pointer", fontSize: "14px", marginTop: "8px" },
  backButton: { position: "absolute", left: 20, top: 20, background: "none", border: "none", color: "#a18cd1", fontSize: 22, cursor: "pointer", zIndex: 10 },
};
