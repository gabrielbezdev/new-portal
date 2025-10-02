import { useCallback, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MENU } from "../routes/menuConfig";
import { Search as SearchIcon } from "lucide-react";
import "./styles/pageToolbar.css";

function findCurrentFromMenu(pathname) {
  const flat = [];
  const walk = (arr) => {
    arr.forEach((it) => {
      if (it.path) flat.push({ label: it.label, path: it.path });
      if (it.items) walk(it.items);
    });
  };
  walk(MENU);

  const exact = flat.find((i) => i.path === pathname);
  if (exact) return exact;

  const normalized = pathname.replace(/\/+$/, "") || "/";
  const candidates = flat
    .filter((i) => normalized.startsWith(i.path.replace(/\/+$/, "") || "/"))
    .sort((a, b) => b.path.length - a.path.length);

  return candidates[0] || null;
}

export default function PageToolbar({
  onSearch,
  searchPlaceholder = "Pesquisar nome",
  // legado (continua funcionando)
  buttonLabel,
  onButtonClick,
  // múltiplos botões
  buttons, // [{ label, onClick, variant: 'secondary'|'primary' }]
  showSearch = true,
  disabledSearch = false,
  // NOVOS
  rightContent,    // JSX para substituir toda a área da direita
  showTitle = true // permite ocultar o título automático
}) {
  const { pathname } = useLocation();
  const currentItem = useMemo(() => findCurrentFromMenu(pathname), [pathname]);
  const inputRef = useRef(null);

  const handleChange = useCallback(() => {
    if (!onSearch) return;
    const value = inputRef.current?.value ?? "";
    clearTimeout(inputRef.current.__t);
    inputRef.current.__t = setTimeout(() => onSearch(value), 250);
  }, [onSearch]);

  const finalButtons = buttons && buttons.length
    ? buttons
    : (buttonLabel ? [{ label: buttonLabel, onClick: onButtonClick, variant: "primary" }] : []);

  return (
    <div className="page-toolbar">
      <div className="pt-left">
        {showTitle && <h1 className="pt-title">{currentItem?.label || ""}</h1>}
      </div>

      <div className="pt-right">
        {rightContent ? (
          rightContent
        ) : (
          <>
            {showSearch && (
              <div className="pt-search">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  onChange={handleChange}
                  disabled={disabledSearch}
                  aria-label="Pesquisar"
                />
                <span className="pt-search-icon" aria-hidden>
                  <SearchIcon size={16} />
                </span>
              </div>
            )}

            {finalButtons.length > 0 && (
              <div className="pt-actions">
                {finalButtons.map((b, i) => (
                  <button
                    key={i}
                    className={`pt-button ${b.variant === "secondary" ? "pt-button--secondary" : "pt-button--primary"}`}
                    onClick={b.onClick}
                    type="button"
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
