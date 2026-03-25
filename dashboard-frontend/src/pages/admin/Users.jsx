import { Lock, Unlock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import { adminApi, USER_ROLE_OPTIONS } from "../../services/api";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
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
        user.name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword),
    );
  }, [users, query]);

  const columns = [
    {
      key: "user",
      header: "User",
      render: (user) => (
        <div className="table-primary">
          <strong>{user.name}</strong>
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
            user.isLocked ? "status-badge-danger" : "status-badge-success"
          }`}
        >
          {user.isLocked ? "Locked" : "Active"}
        </span>
      ),
    },
    {
      key: "articleCount",
      header: "Articles",
    },
    {
      key: "lastActive",
      header: "Last active",
      render: (user) => formatDate(user.lastActive),
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
          {user.isLocked ? <Unlock size={16} /> : <Lock size={16} />}
          {user.isLocked ? "Unlock" : "Lock"}
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
          <p>Review account activity, adjust roles, and lock or unlock access when needed.</p>
        </div>
      </section>

      <section className="panel-card">
        <div className="toolbar">
          <input
            className="toolbar-search"
            type="search"
            placeholder="Search user by name or email"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <AdminTable
          columns={columns}
          rows={filteredUsers}
          emptyTitle="No users found"
          emptyText="Try a different search term or add mock users to the API service."
        />
      </section>
    </div>
  );
}
