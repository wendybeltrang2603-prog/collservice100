import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "chats";

function AdminChatSupervision() {
  const [allMessages, setAllMessages] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setAllMessages(all);
  }, []);

  const grouped = useMemo(() => {
    const map = {};
    allMessages.forEach(m => {
      if (!map[m.employeeId]) map[m.employeeId] = [];
      map[m.employeeId].push(m);
    });
    return map;
  }, [allMessages]);

  const employees = Object.keys(grouped);

  const refreshFromStorage = () => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setAllMessages(all);
  };

  const handleSendAsAdmin = () => {
    if (!selectedEmployeeId || !text.trim()) return;
    const msg = { employeeId: selectedEmployeeId, from: "admin", text: text.trim(), time: Date.now() };
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    all.push(msg);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    setText("");
    refreshFromStorage();
  };

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", display: "flex", gap: 18 }}>
      <div style={{ width: 280, borderRight: "1px solid #eee", paddingRight: 12 }}>
        <h3 style={{ color: "#4c3575" }}>Chats por empleada</h3>
        {employees.length === 0 && <div style={{ color: "#888" }}>No hay chats aún.</div>}
        {employees.map(empId => (
          <div key={empId} style={{ padding: 8, borderRadius: 8, cursor: "pointer", background: empId === selectedEmployeeId ? "#f5f5ff" : "transparent" }} onClick={() => setSelectedEmployeeId(empId)}>
            <div><b>ID:</b> {empId}</div>
            <div style={{ fontSize: 13, color: "#666" }}>{grouped[empId].length} mensajes</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        {!selectedEmployeeId ? (
          <div style={{ color: "#666" }}>Selecciona una empleada para ver el chat.</div>
        ) : (
          <>
            <h3 style={{ color: "#4c3575" }}>Chat - Empleada {selectedEmployeeId}</h3>
            <div style={{ height: 420, overflowY: "auto", border: "1px solid #eee", borderRadius: 8, padding: 12, background: "#fff" }}>
              {(grouped[selectedEmployeeId] || []).map((m, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 13, color: "#333", fontWeight: 600, textTransform: "capitalize" }}>{m.from}</div>
                  <div style={{ background: "#f7f7fb", padding: 8, borderRadius: 6 }}>{m.text}</div>
                  <div style={{ fontSize: 11, color: "#999" }}>{new Date(m.time).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <input value={text} onChange={e => setText(e.target.value)} placeholder="Mensaje como admin..." style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" }} />
              <button onClick={handleSendAsAdmin} style={{ background: "#4c3575", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6 }}>Enviar (admin)</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminChatSupervision;