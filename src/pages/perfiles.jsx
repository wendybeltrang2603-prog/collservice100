import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
  Inserta un botón "Contactar empleada" al final de cada tarjeta existente.
  NO renderiza el chat en esta página (evita que aparezca debajo del footer).
*/
export default function Perfiles() {
  const navigate = useNavigate();

  useEffect(() => {
    const createButton = (id, nombre) => {
      const btn = document.createElement("button");
      btn.className = "btn-contact";
      btn.type = "button";
      btn.textContent = "Contactar empleada";
      Object.assign(btn.style, {
        background: "#e76bb2",
        color: "#fff",
        border: "none",
        padding: "10px 14px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 700,
      });
      // Navegar a la vista /chat (página separada) pasando employee en state
      btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        navigate("/chat", { state: { employee: { id, nombre }, role: "cliente" } });
      });
      return btn;
    };

    const insertIntoCard = (card, idx) => {
      if (!card) return;
      if (card.querySelector(".btn-contact")) return;
      const id = card.getAttribute("data-emp-id") || card.getAttribute("data-id") || `e${idx + 1}`;
      const nameEl = card.querySelector("h3, h2, h1, .name, .perfil-nombre, .card-title");
      const nombre = (nameEl && nameEl.textContent.trim()) || `Empleada ${id}`;
      let footer = card.querySelector(".card-footer, .card-actions, .actions, .footer");
      if (!footer) {
        footer = document.createElement("div");
        footer.className = "card-footer";
        Object.assign(footer.style, { marginTop: "12px", display: "flex", gap: "8px", justifyContent: "center" });
        card.appendChild(footer);
      }
      const btn = createButton(id, nombre);
      footer.appendChild(btn);
    };

    const insertButtons = () => {
      const selectors = [".employee-card", ".profile-card", ".card", ".card-item", ".tarjeta", ".perfil-card", ".col", ".card-wrapper"];
      let any = false;
      selectors.forEach(sel => {
        const nodes = Array.from(document.querySelectorAll(sel));
        if (nodes.length) {
          nodes.forEach((n,i) => insertIntoCard(n, i));
          any = true;
        }
      });

      if (!any) {
        const verPerfilEls = Array.from(document.querySelectorAll("button, a")).filter(el =>
          el.textContent && el.textContent.trim().toLowerCase().includes("ver perfil")
        );
        verPerfilEls.forEach((vp, idx) => {
          const anc = vp.closest("div") || vp.parentElement;
          insertIntoCard(anc, idx);
        });
      }
    };

    insertButtons();
    const obs = new MutationObserver(muts => {
      for (const m of muts) if (m.addedNodes && m.addedNodes.length) { setTimeout(insertButtons, 60); break; }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [navigate]);

  // No renderizar chat aquí
  return null;
}

