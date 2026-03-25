import { Bell, FilePenLine, Home, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/user",
    end: true,
    label: "Home",
    description: "Published articles",
    icon: Home,
  },
  {
    to: "/user/write",
    label: "Write",
    description: "Submit a new revision",
    icon: FilePenLine,
  },
  {
    to: "/user/profile",
    label: "Profile",
    description: "Your articles and revisions",
    icon: UserRound,
  },
  {
    to: "/user/notifications",
    label: "Notifications",
    description: "Approvals, votes, and edits",
    icon: Bell,
  },
];

export default function UserSidebar() {
  return (
    <aside className="user-sidebar">
      <div className="user-brand">
        <p className="section-kicker">Reader Workspace</p>
        <h1>User Portal</h1>
        <p>Discover articles, react to content, and submit revisions for review.</p>
      </div>

      <nav className="user-nav" aria-label="User navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "user-nav-link user-nav-link-active" : "user-nav-link"
              }
            >
              <span className="user-nav-icon">
                <Icon size={18} />
              </span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
