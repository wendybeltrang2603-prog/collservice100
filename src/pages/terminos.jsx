export default function Terminos({ goBack }) {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: 'white', padding: 32, borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', position: 'relative' }}>
      {goBack && (
        <button onClick={goBack} style={{ position: 'absolute', left: 20, top: 20, background: 'none', border: 'none', color: '#a18cd1', fontSize: 22, cursor: 'pointer' }} title="Atrás">←</button>
      )}
      <h2 style={{ color: '#a18cd1', marginBottom: 20 }}>Términos y Condiciones</h2>
      <p>Esta es una página de ejemplo para los Términos y Condiciones de CollService. Aquí puedes colocar el texto legal correspondiente.</p>
    </div>
  );
}
