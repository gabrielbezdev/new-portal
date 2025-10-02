import { useLocation } from "react-router-dom";
import { MENU } from "../routes/menuConfig";
import { Search } from "lucide-react";
import Logo from "../assets/logo.png";
import "./styles/header.css";

function findCurrent(pathname) {
  for (const top of MENU) {
    if (top.path === pathname) return top;

    if (top.items) {
      for (const child of top.items) {
        if (child.path === pathname) return child;

        if (child.items) {
          for (const grand of child.items) {
            if (grand.path === pathname) return grand;
          }
        }
      }
    }
  }
  return null;
}

export default function Header() {
  const { pathname } = useLocation();
  const currentItem = findCurrent(pathname);
  const user = { name: "Francisco Tiago", role: "Administrator" };

  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    if (!q) return;
    console.log("buscar por:", q);
  };

  return (
    <header className="header">
      <div className="header-left">
        <a className="logo" href="/painel-do-supervisor" aria-label="Início">
          <img src={Logo} alt="Logo" />
        </a>

        <form className="search" onSubmit={onSearch} role="search">
          <input
            name="q"
            type="search"
            placeholder="Buscar estratégias, relatórios, configurações..."
            aria-label="Buscar"
          />
          <button type="submit" className="search-btn" aria-label="Pesquisar">
            <Search size={18} />
          </button>
        </form>
      </div>

      <div className="header-right">
        <div className="section-badge">{currentItem?.label ?? ""}</div>

        <div className="user-box">
          <div className="user-name">{user.name}</div>
          <div className="user-role">{user.role}</div>
        </div>
      </div>
    </header>
  );
}