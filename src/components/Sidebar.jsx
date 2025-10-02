import { NavLink } from "react-router-dom";
import { MENU } from "../routes/menuConfig";
import "./styles/sidebar.css";

function LeafLink({ item }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => "sb-link" + (isActive ? " active" : "")}
    >
      {Icon && <Icon className="sb-icon" />}
      <span className="sb-text">{item.label}</span>
    </NavLink>
  );
}

function ChildWithGrandchildren({ child }) {
  return (
    <div className="sb-child has-children">
      <LeafLink item={child} />
      <div className="sb-sublist">
        {child.items.map((grand) => (
          <LeafLink key={grand.path} item={grand} />
        ))}
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar" role="navigation" aria-label="Menu principal">
      {MENU.map((group, idx) => {
        if (group.items) {
          const GroupIcon = group.icon;
          return (
            <div key={idx} className="sb-group">
              <div className="sb-group-title">
                {GroupIcon && <GroupIcon className="sb-icon" />}
                <span>{group.label}</span>
              </div>
              <div className="sb-group-list">
                {group.items.map((child) =>
                  child.items ? (
                    <ChildWithGrandchildren key={child.path} child={child} />
                  ) : (
                    <LeafLink key={child.path} item={child} />
                  )
                )}
              </div>
            </div>
          );
        }
        return (
          <div key={group.label} className="sb-root-list">
            <LeafLink item={group} />
          </div>
        );
      })}
    </aside>
  );
}
