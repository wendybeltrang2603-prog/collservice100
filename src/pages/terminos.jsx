export default function Terminos({ goBack }) {
  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        background: "white",
        padding: 32,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        position: "relative",
      }}
    >
      <h2 style={{ color: "#a18cd1", marginBottom: 20 }}>
        Términos y Condiciones
      </h2>

      <p style={{ marginBottom: 16 }}>
        Bienvenido a <strong>COLLSERVICE</strong>. Al acceder y utilizar
        nuestros servicios, aceptas los siguientes términos y condiciones. Te
        recomendamos leerlos con atención antes de contratar o usar cualquiera
        de nuestros servicios.
      </p>

      <h3 style={{ color: "#555", marginBottom: 10 }}>1. Naturaleza del servicio</h3>
      <p style={{ marginBottom: 16 }}>
        COLLSERVICE actúa únicamente como un <strong>intermediario</strong> entre
        los clientes que requieren servicios y las personas independientes que
        los prestan. Nuestra función es conectar ambas partes para facilitar la
        contratación, pero no formamos parte de la relación laboral o contractual
        entre cliente y trabajador.
      </p>

      <h3 style={{ color: "#555", marginBottom: 10 }}>2. Limitación de responsabilidad</h3>
      <p style={{ marginBottom: 16 }}>
        COLLSERVICE <strong>no se hace responsable</strong> por pérdidas,
        daños materiales, daños a la propiedad, robos, accidentes o cualquier
        situación que ocurra durante la prestación de los servicios. Toda
        responsabilidad recae directamente en la persona contratada y en el
        cliente que solicita el servicio.
      </p>

      <h3 style={{ color: "#555", marginBottom: 10 }}>3. Uso de los servicios</h3>
      <p style={{ marginBottom: 16 }}>
        Los servicios ofrecidos por COLLSERVICE están destinados únicamente para
        fines domésticos y empresariales legales. Está prohibido utilizar los
        servicios para actividades ilícitas o que atenten contra la seguridad y
        el bienestar de terceros.
      </p>

      <h3 style={{ color: "#555", marginBottom: 10 }}>4. Reservas y pagos</h3>
      <p style={{ marginBottom: 16 }}>
        Las reservas deben realizarse con anticipación. Los pagos se realizan de
        acuerdo con los métodos autorizados por la empresa, pero cualquier
        acuerdo económico adicional entre cliente y trabajador es
        responsabilidad exclusiva de dichas partes.
      </p>

      <h3 style={{ color: "#555", marginBottom: 10 }}>5. Cancelaciones</h3>
      <p style={{ marginBottom: 16 }}>
        Las cancelaciones deberán notificarse con al menos 24 horas de
        anticipación. En caso contrario, se podrá aplicar un cargo por servicio
        reservado.
      </p>

      <h3 style={{ color: "#555", marginBottom: 10 }}>6. Privacidad</h3>
      <p style={{ marginBottom: 16 }}>
        Toda la información personal compartida con COLLSERVICE será tratada de
        manera confidencial y utilizada únicamente para la gestión de los
        servicios solicitados.
      </p>

      <h3 style={{ color: "#555", marginBottom: 10 }}>7. Modificaciones</h3>
      <p style={{ marginBottom: 16 }}>
        COLLSERVICE se reserva el derecho de modificar estos términos y
        condiciones en cualquier momento. Los cambios serán publicados en esta
        página y entrarán en vigencia inmediatamente.
      </p>

      {/* Botón volver abajo */}
      {goBack && (
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button
            onClick={goBack}
            style={{
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
        </div>
      )}
    </div>
  );
}
