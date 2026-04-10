import { ArrowLeft, Bell, Clock, FilePenLine, Heart, Home, LogOut, UserRound, FileText, Globe } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/user", end: true, label: "Home", icon: Home },
  { to: "/user/saved", label: "Saved", icon: Heart },
  { to: "/user/history", label: "History", icon: Clock },
  { to: "/user/create", label: "Create", icon: FileText },
  { to: "/user/write", label: "Edit", icon: FilePenLine },
  { to: "/user/profile", label: "Profile", icon: UserRound },
  { to: "/user/notifications", label: "Notifications", icon: Bell },
];

export default function UserSidebar() {
  const publicFrontendUrl = "http://localhost:5173";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = `${publicFrontendUrl}?logout=true`;
  };

  return (
    <aside className="sidebar sidebar-user">
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon sidebar-brand-icon-user">
          <Globe size={20} />
        </span>
        <div>
          <strong className="sidebar-brand-title">Global History</strong>
          <small className="sidebar-brand-sub">User Portal</small>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="User navigation">
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
          id="user-logout-button"
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
