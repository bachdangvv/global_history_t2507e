import { Lock, Unlock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import { adminApi, USER_ROLE_OPTIONS } from "../../services/api";

function formatDate(value) {
  if (!value) return "Never";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  async function loadUsers() {
    setUsers(await adminApi.getUsers());
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleRoleChange(userId, role) {
    await adminApi.updateUserRole(userId, role);
    await loadUsers();
  }

  async function handleToggleLock(userId) {
    await adminApi.toggleUserLock(userId);
    await loadUsers();
  }

  const filteredUsers = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return users;
    }

    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword),
    );
  }, [users, query]);

  const columns = [
    {
      key: "user",
      header: "User",
      render: (user) => (
        <div className="table-primary">
          <strong>{user.username}</strong>
          <p>{user.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <select
          className="table-select"
          value={user.role}
          onChange={(event) => handleRoleChange(user.id, event.target.value)}
        >
          {USER_ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <span
          className={`status-badge ${
            user.is_locked ? "status-badge-danger" : "status-badge-success"
          }`}
        >
          {user.is_locked ? "Locked" : "Active"}
        </span>
      ),
    },
    {
      key: "articleCount",
      header: "Articles",
    },
    {
      key: "editCount",
      header: "Edits",
    },
    {
      key: "pendingEditCount",
      header: "Pending",
    },
    {
      key: "last_active_at",
      header: "Last active",
      render: (user) => formatDate(user.last_active_at),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user) => (
        <button
          type="button"
          className="button button-secondary button-small"
          onClick={() => handleToggleLock(user.id)}
        >
          {user.is_locked ? <Unlock size={16} /> : <Lock size={16} />}
          {user.is_locked ? "Unlock" : "Lock"}
        </button>
      ),
    },
  ];

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="section-kicker">Users management</p>
          <h1>Users</h1>
          <p>Review contributor activity, switch admin access, and lock or unlock accounts when needed.</p>
        </div>
      </section>

      <section className="panel-card">
        <div className="toolbar">
          <input
            className="toolbar-search"
            type="search"
            placeholder="Search user by username or email"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <AdminTable
          columns={columns}
          rows={filteredUsers}
          emptyTitle="No users found"
          emptyText="Try a different search term or add more contributors to the schema store."
        />
      </section>
    </div>
  );
}
