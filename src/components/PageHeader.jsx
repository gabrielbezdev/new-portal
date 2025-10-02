import { useLocation } from "react-router-dom";
import { MENU } from "../routes/menuConfig";
import "./styles/pageHeader.css";

function findTrail(pathname) {
  for (const top of MENU) {
    if (top.items) {
      for (const child of top.items) {
        if (child.path === pathname) {
          return { trail: [top.label, child.label], item: child };
        }
        if (child.items) {
          for (const grand of child.items) {
            if (grand.path === pathname) {
              return { trail: [top.label, child.label, grand.label], item: grand };
            }
          }
        }
      }
    } else if (top.path === pathname) {
      return { trail: [top.label], item: top };
    }
  }
  return { trail: [], item: null };
}

function buildSentence(item) {
  if (!item?.pluralLabel || !item?.gender) return "";
  const pron = item.gender === "f" ? "todas as suas" : "todos os seus";
  return `Gerencie ${pron} ${item.pluralLabel}`;
}

export default function PageHeader() {
  const { pathname } = useLocation();
  const { trail, item } = findTrail(pathname);
  const sentence = buildSentence(item);

  if (!trail.length) return null;

  return (
    <div className="page-header">
      <div className="page-header__breadcrumb">
        {trail.join(" > ")}
      </div>
      {sentence && (
        <div className="page-header__subtitle">
          {sentence}
        </div>
      )}
    </div>
  );
}