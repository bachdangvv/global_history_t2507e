import {
  CalendarRange,
  FilePenLine,
  FolderTree,
  LayoutDashboard,
  Newspaper,
  Shapes,
  Tags,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/admin",
    end: true,
    label: "Overview",
    description: "Metrics and content health",
    icon: LayoutDashboard,
  },
  {
    to: "/admin/articles",
    label: "Articles",
    description: "Browse and moderate content",
    icon: Newspaper,
  },
  {
    to: "/admin/edits",
    label: "Edits",
    description: "Approve or reject pending edits",
    icon: FilePenLine,
  },
  {
    to: "/admin/topics",
    label: "Topics",
    description: "Knowledge graph taxonomy",
    icon: FolderTree,
  },
  {
    to: "/admin/categories",
    label: "Categories",
    description: "Editorial structure",
    icon: Shapes,
  },
  {
    to: "/admin/tags",
    label: "Tags",
    description: "Reusable labels",
    icon: Tags,
  },
  {
    to: "/admin/events",
    label: "Events",
    description: "Historical event records",
    icon: CalendarRange,
  },
  {
    to: "/admin/users",
    label: "Users",
    description: "Roles and account access",
    icon: Users,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <p className="admin-brand-eyebrow">Global History</p>
        <h1>Admin Console</h1>
        <p>Content operations, moderation, taxonomy, events, and contributor administration.</p>
      </div>

      <nav className="admin-nav" aria-label="Admin navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "admin-nav-link admin-nav-link-active" : "admin-nav-link"
              }
            >
              <span className="admin-nav-icon">
                <Icon size={18} />
              </span>
              <span className="admin-nav-copy">
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
