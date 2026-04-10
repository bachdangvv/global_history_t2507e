import {
  ArrowLeft,
  CalendarRange,
  FilePenLine,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Shapes,
  Tags,
  Users,
  Globe,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/admin", end: true, label: "Overview", icon: LayoutDashboard },
  { to: "/admin/articles", label: "Articles", icon: Newspaper },
  { to: "/admin/edits", label: "Edits", icon: FilePenLine },
  { to: "/admin/topics", label: "Topics", icon: FolderTree },
  { to: "/admin/categories", label: "Categories", icon: Shapes },
  { to: "/admin/tags", label: "Tags", icon: Tags },
  { to: "/admin/events", label: "Events", icon: CalendarRange },
  { to: "/admin/users", label: "Users", icon: Users },
];

export default function AdminSidebar() {
  const publicFrontendUrl = "http://localhost:5173";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = `${publicFrontendUrl}?logout=true`;
  };

  return (
    <aside className="sidebar sidebar-admin">
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon">
          <Globe size={20} />
        </span>
        <div>
          <strong className="sidebar-brand-title">Global History</strong>
          <small className="sidebar-brand-sub">Admin Console</small>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Admin navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
              }
            >
              <span className="sidebar-link-icon">
                <Icon size={18} />
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <a href={publicFrontendUrl} className="sidebar-link sidebar-link-muted">
          <span className="sidebar-link-icon">
            <ArrowLeft size={18} />
          </span>
          <span>Public site</span>
        </a>
        <button
          onClick={handleLogout}
          className="sidebar-link sidebar-link-danger"
          id="admin-logout-button"
        >
          <span className="sidebar-link-icon">
            <LogOut size={18} />
          </span>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
