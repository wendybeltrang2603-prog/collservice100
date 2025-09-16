export default function Privacidad({ goBack }) {
  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        background: "white",
        padding: "60px 32px 32px", // 👈 más espacio arriba
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        position: "relative",
      }}
    >
      <h2 style={{ color: "#a18cd1", marginBottom: 20 }}>
        Política de Privacidad
      </h2>

      <p>
        En <b>COLLSERVICE</b>, valoramos y respetamos tu privacidad. La
        información personal que nos proporciones será utilizada únicamente para
        la gestión de los servicios que solicites y no será compartida con
        terceros sin tu consentimiento, salvo en casos legales que lo requieran.
      </p>

      <p>
        Recopilamos datos como nombre, correo electrónico y número de teléfono
        para ponernos en contacto contigo y gestionar las solicitudes de
        servicio. Estos datos se almacenan de forma segura y se manejan con
        estricta confidencialidad.
      </p>

      <p>
        Al usar nuestros servicios, aceptas esta política de privacidad. Nos
        reservamos el derecho de actualizarla en cualquier momento, y los
        cambios serán publicados en esta página.
      </p>

      {goBack && (
        <button
          onClick={goBack}
          style={{
            display: "block",      // 👈 hace que ocupe todo el ancho
            margin: "30px auto 0", // 👈 lo centra horizontalmente
            background: "#ecafd2ff",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ⬅ Volver
        </button>
      )}
    </div>
  );
}
