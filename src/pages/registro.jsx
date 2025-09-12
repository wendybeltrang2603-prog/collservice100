import { useState } from "react";

function RegistroMultiPaso({ goBack, rol }) {
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
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        servicios: { ...prev.servicios, [name]: checked },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files[0] }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // No se usa en multi-paso, se usa validateStep

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert("Registro enviado");
      console.log({ ...form, rol });
    }
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(180deg, #c5a4f1, #3b057f); display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 30px; color: #222; }
        .registro-container { background: #f4e6ff; border-radius: 12px; box-shadow: 0 0 20px rgba(59, 5, 127, 0.6); width: 380px; padding: 30px 25px; font-size: 13px; }
        h2 { text-align: center; margin-bottom: 20px; font-weight: 600; color: #4b2879; }
        .input-group { margin-bottom: 14px; display: flex; flex-direction: column; }
        label { font-weight: 600; margin-bottom: 4px; color: #4b2879; }
        input[type="text"], input[type="email"], input[type="date"], select, textarea, input[type="file"], input[type="tel"], input[type="number"] { padding: 7px 10px; border-radius: 5px; border: 1px solid #7b68ee; font-size: 13px; }
        textarea { min-height: 60px; resize: vertical; }
        input[type="checkbox"] { margin-right: 6px; cursor: pointer; width: 16px; height: 16px; }
        .checkbox-group label { display: flex; align-items: center; margin-bottom: 5px; font-weight: 500; cursor: pointer; }
        .inline-group { display: flex; gap: 12px; margin-bottom: 14px; }
        .inline-group > div { flex: 1; display: flex; flex-direction: column; }
        button { padding: 10px 15px; background: #6d4ad9; border: none; border-radius: 6px; color: white; font-weight: 700; cursor: pointer; font-size: 14px; margin: 8px 5px 0 0; flex: 1; transition: background 0.3s ease; }
        button:hover { background: #4b3ab2; }
        .buttons { display: flex; justify-content: space-between; }
        .btn-disabled { background: #a89be0; cursor: not-allowed; }
        .note { font-size: 11px; color: #4b2879; margin-top: -10px; margin-bottom: 12px; }
        .error-message { color: red; font-size: 11px; margin-top: 3px; }
        .camera-box { border: 1.8px solid #7b68ee; height: 110px; background: #d7b9ff; display: flex; justify-content: center; align-items: center; color: #4b2879; margin-bottom: 12px; font-size: 12px; }
      `}</style>
      <div className="registro-container" style={{ position: 'relative' }}>
        {goBack && (
          <button onClick={goBack} style={{ position: 'absolute', left: 20, top: 20, background: 'none', border: 'none', color: '#a18cd1', fontSize: 22, cursor: 'pointer', zIndex: 10 }} title="Atrás">←</button>
        )}
        <h2>REGISTRO {rol ? `- ${rol.charAt(0).toUpperCase() + rol.slice(1)}` : ''} - Paso {step} de 3</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="input-group">
                <label>Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required />
                {errors.nombre && <small className="error-message">{errors.nombre}</small>}
              </div>
              <div className="input-group">
                <label>Apellido</label>
                <input name="apellido" value={form.apellido} onChange={handleChange} required />
                {errors.apellido && <small className="error-message">{errors.apellido}</small>}
              </div>
              <div className="input-group">
                <label>Tipo de Documento</label>
                <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="TI">Tarjeta de identidad</option>
                  <option value="PAS">Pasaporte</option>
                </select>
                {errors.tipoDocumento && <small className="error-message">{errors.tipoDocumento}</small>}
              </div>
              <div className="input-group">
                <label>Número de Documento</label>
                <input name="numeroDocumento" value={form.numeroDocumento} onChange={handleChange} required />
                {errors.numeroDocumento && <small className="error-message">{errors.numeroDocumento}</small>}
              </div>
              <div className="inline-group">
                <div>
                  <label>Fecha Nacimiento</label>
                  <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required />
                  {errors.fechaNacimiento && <small className="error-message">{errors.fechaNacimiento}</small>}
                </div>
                <div>
                  <label>Fecha Expedición</label>
                  <input type="date" name="fechaExpedicion" value={form.fechaExpedicion} onChange={handleChange} required />
                  {errors.fechaExpedicion && <small className="error-message">{errors.fechaExpedicion}</small>}
                </div>
              </div>
              <div className="input-group">
                <label>Teléfono</label>
                <input name="telefono" type="tel" value={form.telefono} onChange={handleChange} required />
                {errors.telefono && <small className="error-message">{errors.telefono}</small>}
              </div>
              <div className="input-group">
                <label>Correo</label>
                <input name="correo" type="email" value={form.correo} onChange={handleChange} required />
                {errors.correo && <small className="error-message">{errors.correo}</small>}
              </div>
              <div className="input-group">
                <label>Dirección</label>
                <input name="direccion" value={form.direccion} onChange={handleChange} required />
                {errors.direccion && <small className="error-message">{errors.direccion}</small>}
              </div>
              <div className="input-group">
                <label>Horario Disponible (ej. Lun-Vie 8am-5pm)</label>
                <textarea name="horarioDisponible" value={form.horarioDisponible} onChange={handleChange} required />
                {errors.horarioDisponible && <small className="error-message">{errors.horarioDisponible}</small>}
              </div>
              <div className="inline-group">
                <div>
                  <label>Hora Entrada</label>
                  <input type="time" name="horaEntrada" value={form.horaEntrada} onChange={handleChange} required />
                  {errors.horaEntrada && <small className="error-message">{errors.horaEntrada}</small>}
                </div>
                <div>
                  <label>Hora Salida</label>
                  <input type="time" name="horaSalida" value={form.horaSalida} onChange={handleChange} required />
                  {errors.horaSalida && <small className="error-message">{errors.horaSalida}</small>}
                </div>
              </div>
              <div className="input-group">
                <label>Salario Requerido</label>
                <input type="number" name="salarioRequerido" value={form.salarioRequerido} onChange={handleChange} required min="1" />
                {errors.salarioRequerido && <small className="error-message">{errors.salarioRequerido}</small>}
              </div>
              <div className="checkbox-group">
                <label>Servicios</label>
                {Object.entries(form.servicios).map(([key, checked]) => (
                  <label key={key}>
                    <input type="checkbox" name={key} checked={checked} onChange={handleChange} />
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                  </label>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="input-group">
                <label>Habilidades y Experiencia</label>
                <textarea name="habilidades" value={form.habilidades} onChange={handleChange} required />
                {errors.habilidades && <small className="error-message">{errors.habilidades}</small>}
              </div>
              <div className="input-group">
                <label>Antecedentes Disciplinarios</label>
                <textarea name="antecedentes" value={form.antecedentes} onChange={handleChange} placeholder="Especifique si tiene antecedentes o escriba 'Ninguno'" required />
                {errors.antecedentes && <small className="error-message">{errors.antecedentes}</small>}
              </div>
              <div className="inline-group">
                <div>
                  <label>Años Experiencia</label>
                  <select name="experiencia.año" value={form.experiencia.año} onChange={e => setForm(prev => ({ ...prev, experiencia: { ...prev.experiencia, año: e.target.value } }))} required>
                    <option value="">Años</option>
                    {[...Array(51).keys()].map(y => (<option key={y} value={y}>{y}</option>))}
                  </select>
                  {errors.experienciaAño && <small className="error-message">{errors.experienciaAño}</small>}
                </div>
                <div>
                  <label>Meses Experiencia</label>
                  <select name="experiencia.mes" value={form.experiencia.mes} onChange={e => setForm(prev => ({ ...prev, experiencia: { ...prev.experiencia, mes: e.target.value } }))} required>
                    <option value="">Meses</option>
                    {[...Array(12).keys()].map(m => (<option key={m} value={m}>{m}</option>))}
                  </select>
                  {errors.experienciaMes && <small className="error-message">{errors.experienciaMes}</small>}
                </div>
                <div>
                  <label>Días Experiencia</label>
                  <select name="experiencia.dia" value={form.experiencia.dia} onChange={e => setForm(prev => ({ ...prev, experiencia: { ...prev.experiencia, dia: e.target.value } }))} required>
                    <option value="">Días</option>
                    {[...Array(31).keys()].map(d => (<option key={d} value={d}>{d}</option>))}
                  </select>
                  {errors.experienciaDia && <small className="error-message">{errors.experienciaDia}</small>}
                </div>
              </div>
              <div className="input-group">
                <label>Nombre Jefe Inmediato</label>
                <input name="nombreJefe" value={form.jefeInmediato.nombre} onChange={e => setForm(prev => ({ ...prev, jefeInmediato: { ...prev.jefeInmediato, nombre: e.target.value } }))} required />
                {errors.nombreJefe && <small className="error-message">{errors.nombreJefe}</small>}
              </div>
              <div className="input-group">
                <label>Teléfono Jefe Inmediato</label>
                <input name="telefonoJefe" type="tel" value={form.jefeInmediato.telefono} onChange={e => setForm(prev => ({ ...prev, jefeInmediato: { ...prev.jefeInmediato, telefono: e.target.value } }))} required />
                {errors.telefonoJefe && <small className="error-message">{errors.telefonoJefe}</small>}
              </div>
              <div className="inline-group">
                <div>
                  <label>Fecha Inicio</label>
                  <input type="date" name="fechaInicio" value={form.jefeInmediato.fechaInicio} onChange={e => setForm(prev => ({ ...prev, jefeInmediato: { ...prev.jefeInmediato, fechaInicio: e.target.value } }))} required />
                  {errors.fechaInicio && <small className="error-message">{errors.fechaInicio}</small>}
                </div>
                <div>
                  <label>Fecha Fin</label>
                  <input type="date" name="fechaFin" value={form.jefeInmediato.fechaFin} onChange={e => setForm(prev => ({ ...prev, jefeInmediato: { ...prev.jefeInmediato, fechaFin: e.target.value } }))} required />
                  {errors.fechaFin && <small className="error-message">{errors.fechaFin}</small>}
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="input-group">
                <label>Documento Adjuntado (PDF o imagen)</label>
                <input type="file" name="documentoAdjunto" onChange={handleFileChange} accept="application/pdf,image/*" required />
                {errors.documentoAdjunto && <small className="error-message">{errors.documentoAdjunto}</small>}
              </div>
              {rol === "administrador" && (
                <div className="input-group">
                  <label>Código de Verificación</label>
                  <input name="codigoVerificacion" value={form.codigoVerificacion} onChange={handleChange} required />
                  {errors.codigoVerificacion && <small className="error-message">{errors.codigoVerificacion}</small>}
                </div>
              )}
            </>
          )}
          <div className="buttons">
            {step > 1 && (<button type="button" onClick={() => setStep(step - 1)}>Anterior</button>)}
            {step < 3 && (<button type="button" onClick={() => setStep(step + 1)}>Siguiente</button>)}
            {step === 3 && (<button type="submit">Finalizar</button>)}
          </div>
        </form>
      </div>
    </>
  );

function RegistroEmpleado({ goBack }) {
  const [rol, setRol] = useState("");
  if (!rol) {
    return (
      <div className="registro-container" style={{ position: 'relative' }}>
        {goBack && (
          <button onClick={goBack} style={{ position: 'absolute', left: 20, top: 20, background: 'none', border: 'none', color: '#a18cd1', fontSize: 22, cursor: 'pointer', zIndex: 10 }} title="Atrás">←</button>
        )}
        <h2>Selecciona el tipo de registro</h2>
        <div className="input-group">
          <label>Rol de registro</label>
          <select name="rol" value={rol} onChange={e => setRol(e.target.value)} required>
            <option value="">Seleccione un rol</option>
            <option value="administrador">Administrador</option>
            <option value="cliente">Cliente</option>
            <option value="empleada">Empleada</option>
          </select>
        </div>
      </div>
    );
  }
  return <RegistroMultiPaso goBack={goBack} rol={rol} />;
}

export default RegistroEmpleado;
}
