import { useState } from "react";

export default function RegistroEmpleada({ goBack }) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    fechaExpedicion: "",
    telefono: "",
    correo: "",
    direccion: "",
    horarioDisponible: "",
    horaEntrada: "",
    horaSalida: "",
    salarioRequerido: "",
    servicios: {
      limpieza: false,
      lavanderia: false,
      preparacionAlimentos: false,
      cuidadoAdultos: false,
      ninera: false,
      cuidadoCanino: false,
    },
    habilidades: "",
    antecedentes: "",
    experiencia: { año: "", mes: "", dia: "" },
    jefeInmediato: {
      nombre: "",
      telefono: "",
      fechaInicio: "",
      fechaFin: "",
    },
    documentoAdjunto: null,
    selfieDocumento: null,
    codigoVerificacion: "",
    aceptarTerminos: false, // ← NUEVO
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        servicios: prev.servicios.hasOwnProperty(name)
          ? { ...prev.servicios, [name]: checked }
          : prev.servicios,
        [name]: prev.hasOwnProperty(name) ? checked : prev[name],
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.aceptarTerminos) {
      alert("Debes aceptar los términos y condiciones ✅");
      return;
    }
    alert("Registro de empleada enviado ✅");
    console.log(form);
  };

  const canGoNext = () => {
    if (step === 1) {
      return (
        form.nombre.trim() &&
        form.apellido.trim() &&
        form.tipoDocumento &&
        form.numeroDocumento.trim() &&
        form.fechaNacimiento &&
        form.fechaExpedicion &&
        form.telefono.trim() &&
        form.correo.trim() &&
        form.direccion.trim()
      );
    }
    if (step === 2) {
      return (
        form.horaEntrada &&
        form.horaSalida &&
        form.salarioRequerido &&
        Object.values(form.servicios).some((v) => v)
      );
    }
    if (step === 3) {
      return (
        form.experiencia.año &&
        form.experiencia.mes &&
        form.experiencia.dia &&
        form.jefeInmediato.nombre.trim() &&
        form.jefeInmediato.telefono.trim() &&
        form.jefeInmediato.fechaInicio &&
        form.jefeInmediato.fechaFin &&
        form.documentoAdjunto &&
        form.selfieDocumento &&
        form.aceptarTerminos
      );
    }
    return false;
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {goBack && (
          <button
            onClick={goBack}
            style={{
              position: "absolute",
              left: 20,
              top: 20,
              background: "none",
              border: "none",
              color: "#a18cd1",
              fontSize: 22,
              cursor: "pointer",
              zIndex: 10,
            }}
            title="Atrás"
          >
            ←
          </button>
        )}

        <h2 style={styles.title}>Registro Empleada - Paso {step} de 3</h2>

        <form onSubmit={handleSubmit}>
          {/* === PASO 1 === */}
          {step === 1 && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nombre</label>
                <input
                  style={styles.input}
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Apellido</label>
                <input
                  style={styles.input}
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Tipo de Documento</label>
                <select
                  style={styles.input}
                  name="tipoDocumento"
                  value={form.tipoDocumento}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="CC">Cédula</option>
                  <option value="TI">Tarjeta de identidad</option>
                  <option value="PAS">Pasaporte</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Número de Documento</label>
                <input
                  style={styles.input}
                  name="numeroDocumento"
                  value={form.numeroDocumento}
                  onChange={handleChange}
                  required
                />
              </div>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "14px" }}
              >
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Fecha Nacimiento</label>
                  <input
                    style={styles.input}
                    type="date"
                    name="fechaNacimiento"
                    value={form.fechaNacimiento}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Fecha Expedición</label>
                  <input
                    style={styles.input}
                    type="date"
                    name="fechaExpedicion"
                    value={form.fechaExpedicion}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Teléfono</label>
                <input
                  style={styles.input}
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Correo</label>
                <input
                  style={styles.input}
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Dirección</label>
                <input
                  style={styles.input}
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Horario Disponible</label>
                <textarea
                  style={styles.input}
                  name="horarioDisponible"
                  value={form.horarioDisponible}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* === PASO 2 === */}
          {step === 2 && (
            <>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "14px" }}
              >
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Hora Entrada</label>
                  <input
                    style={styles.input}
                    type="time"
                    name="horaEntrada"
                    value={form.horaEntrada}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Hora Salida</label>
                  <input
                    style={styles.input}
                    type="time"
                    name="horaSalida"
                    value={form.horaSalida}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Salario Requerido</label>
                <input
                  style={styles.input}
                  type="number"
                  name="salarioRequerido"
                  value={form.salarioRequerido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Servicios</label>
                {Object.entries(form.servicios).map(([key, checked]) => (
                  <label key={key} style={{ display: "block", marginBottom: "4px" }}>
                    <input
                      type="checkbox"
                      name={key}
                      checked={checked}
                      onChange={handleChange}
                      style={{ marginRight: "6px" }}
                    />
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")}
                  </label>
                ))}
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Habilidades</label>
                <textarea
                  style={styles.input}
                  name="habilidades"
                  value={form.habilidades}
                  onChange={handleChange}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Antecedentes</label>
                <textarea
                  style={styles.input}
                  name="antecedentes"
                  value={form.antecedentes}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* === PASO 3 === */}
          {step === 3 && (
            <>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "14px" }}
              >
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Años de Experiencia</label>
                  <input
                    style={styles.input}
                    type="number"
                    value={form.experiencia.año}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        experiencia: { ...prev.experiencia, año: e.target.value },
                      }))
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Meses</label>
                  <input
                    style={styles.input}
                    type="number"
                    value={form.experiencia.mes}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        experiencia: { ...prev.experiencia, mes: e.target.value },
                      }))
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Días</label>
                  <input
                    style={styles.input}
                    type="number"
                    value={form.experiencia.dia}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        experiencia: { ...prev.experiencia, dia: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Nombre Jefe Inmediato</label>
                <input
                  style={styles.input}
                  value={form.jefeInmediato.nombre}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      jefeInmediato: { ...prev.jefeInmediato, nombre: e.target.value },
                    }))
                  }
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Teléfono Jefe Inmediato</label>
                <input
                  style={styles.input}
                  type="tel"
                  value={form.jefeInmediato.telefono}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      jefeInmediato: { ...prev.jefeInmediato, telefono: e.target.value },
                    }))
                  }
                />
              </div>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "14px" }}
              >
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Fecha Inicio</label>
                  <input
                    style={styles.input}
                    type="date"
                    value={form.jefeInmediato.fechaInicio}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        jefeInmediato: { ...prev.jefeInmediato, fechaInicio: e.target.value },
                      }))
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Fecha Fin</label>
                  <input
                    style={styles.input}
                    type="date"
                    value={form.jefeInmediato.fechaFin}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        jefeInmediato: { ...prev.jefeInmediato, fechaFin: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Documento (PDF o imagen)</label>
                <input
                  type="file"
                  name="documentoAdjunto"
                  onChange={handleFileChange}
                  accept="application/pdf,image/*"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Selfie con Documento</label>
                <input
                  type="file"
                  name="selfieDocumento"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={styles.input}
                />
              </div>

              {/* ✅ Checkbox Términos y Condiciones */}
              <div
                style={{
                  ...styles.inputGroup,
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <input
                  type="checkbox"
                  name="aceptarTerminos"
                  checked={form.aceptarTerminos}
                  onChange={handleChange}
                  style={{ marginRight: "8px" }}
                  required
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

          {/* BOTONES */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {step > 1 && (
              <button
                type="button"
                style={styles.button}
                onClick={() => setStep(step - 1)}
              >
                Anterior
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                style={{
                  ...styles.button,
                  opacity: canGoNext() ? 1 : 0.5,
                  cursor: canGoNext() ? "pointer" : "not-allowed",
                }}
                onClick={() => canGoNext() && setStep(step + 1)}
                disabled={!canGoNext()}
              >
                Siguiente
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                style={{
                  ...styles.button,
                  opacity: canGoNext() ? 1 : 0.5,
                  cursor: canGoNext() ? "pointer" : "not-allowed",
                }}
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

// 🎨 Estilos
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
    position: "relative",
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
    width: "100%",
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
    transition: "background 0.3s ease",
    marginTop: "8px",
  },
};
