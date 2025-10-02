import { useEffect, useRef } from "react";
import "./styles/drawer.css";

export default function Drawer({
  open,
  onClose,
  title,
  children,      
  footer,           
  width = 420,    
  closeOnOverlay = true,
}) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const el = panelRef.current?.querySelector("[data-autofocus]") || panelRef.current;
      el?.focus?.();
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div
        ref={overlayRef}
        className="drawer__overlay"
        onClick={() => { if (closeOnOverlay) onClose?.(); }}
      />
      <aside
        ref={panelRef}
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        style={{ "--drawer-w": `${width}px` }}
      >
        <header className="drawer__header">
          <h2 className="drawer__title">{title}</h2>
          <button className="drawer__close" onClick={onClose} aria-label="Fechar">×</button>
        </header>

        <div className="drawer__body">
          {children}
        </div>

        {footer && <footer className="drawer__footer">{footer}</footer>}
      </aside>
    </div>
  );
}
