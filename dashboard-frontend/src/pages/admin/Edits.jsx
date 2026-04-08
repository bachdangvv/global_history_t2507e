import { Check, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import { adminApi } from "../../services/api";

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  const d = new Date(value);
  if (isNaN(d.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default function EditsPage() {
  const [edits, setEdits] = useState([]);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadEdits(selectedId) {
    setIsLoading(true);
    setError("");

    try {
      const pendingEdits = await adminApi.getPendingEdits();
      setEdits(pendingEdits);
      setSelectedEdit(
        pendingEdits.find((edit) => edit.id === selectedId) ||
          pendingEdits.find((edit) => edit.id === selectedEdit?.id) ||
          pendingEdits[0] ||
          null,
      );
    } catch (loadError) {
      setEdits([]);
      setSelectedEdit(null);
      setError(loadError instanceof Error ? loadError.message : "Unable to load pending edits.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadEdits();
  }, []);

  async function handleApprove(editId) {
    setMessage("");

    try {
      await adminApi.approveEdit(editId);
      setMessage("Edit approved successfully.");
      await loadEdits(editId);
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Unable to approve this edit.");
    }
  }

  async function handleReject(editId) {
    setMessage("");

    try {
      await adminApi.rejectEdit(editId);
      setMessage("Edit rejected successfully.");
      await loadEdits(editId);
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Unable to reject this edit.");
    }
  }

  const filteredEdits = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return edits.filter((edit) => {
      const title = String(edit.title || "").toLowerCase();
      const summary = String(edit.summary || "").toLowerCase();
      const editorName = String(edit.editorName || "").toLowerCase();
      const matchesKeyword =
        !keyword ||
        title.includes(keyword) ||
        summary.includes(keyword) ||
        editorName.includes(keyword);
      const matchesType = typeFilter === "all" || edit.editable_type === typeFilter;

      return matchesKeyword && matchesType;
    });
  }, [edits, query, typeFilter]);

  useEffect(() => {
    if (!filteredEdits.length) {
      setSelectedEdit(null);
      return;
    }

    if (!filteredEdits.some((edit) => edit.id === selectedEdit?.id)) {
      setSelectedEdit(filteredEdits[0]);
    }
  }, [filteredEdits, selectedEdit]);

  const columns = [
    {
      key: "title",
      header: "Edit",
      render: (edit) => (
        <div className="table-primary">
          <strong>{edit.title}</strong>
          <p>{edit.summary}</p>
        </div>
      ),
    },
    { key: "editable_type", header: "Type" },
    { key: "editorName", header: "Editor" },
    {
      key: "votes",
      header: "Votes",
      render: (edit) => `${edit.upvote_count} / ${edit.downvote_count}`,
    },
    {
      key: "created_at",
      header: "Submitted",
      render: (edit) => formatDate(edit.created_at),
    },
    {
      key: "actions",
      header: "Actions",
      render: (edit) => (
        <div className="table-actions">
          <button type="button" className="button button-secondary button-small" onClick={() => setSelectedEdit(edit)}>
            View
          </button>
          <button type="button" className="icon-button" onClick={() => handleApprove(edit.id)} aria-label="Approve edit">
            <Check size={16} />
          </button>
          <button type="button" className="icon-button icon-button-danger" onClick={() => handleReject(edit.id)} aria-label="Reject edit">
            <X size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="section-kicker">Edits moderation</p>
          <h1>Pending edits</h1>
          <p>Review edit submissions, compare them with the current live record, then approve or reject.</p>
        </div>
      </section>

      {message ? <div className="notice-banner">{message}</div> : null}
      {error ? <div className="notice-banner notice-banner-danger">{error}</div> : null}

      <section className="panel-card">
        <div className="toolbar">
          <label className="search-input">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search edit title, summary, or editor"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="toolbar-group">
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="all">All edit types</option>
              <option value="article">Article</option>
              <option value="historical_event">Historical event</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="table-empty-state">
            <h3>Loading moderation queue</h3>
            <p>Fetching the latest pending edits.</p>
          </div>
        ) : (
          <AdminTable
            columns={columns}
            rows={filteredEdits}
            emptyTitle="No pending edits"
            emptyText="The moderation queue is currently clear."
          />
        )}
      </section>

      <section className="panel-card">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Edit detail</p>
            <h2>{selectedEdit ? selectedEdit.title : "Select an edit"}</h2>
            <p>
              {selectedEdit
                ? "Compare the pending edit with the current live record before moderating."
                : "Choose an edit from the queue to inspect the comparison panel."}
            </p>
          </div>
        </div>

        {selectedEdit ? (
          <div className="page-grid page-grid-two">
            <div className="detail-card detail-card-wide">
              <span className="detail-label">Pending edit submission</span>
              <p><strong>Type:</strong> {selectedEdit.editable_type}</p>
              <p><strong>Editor:</strong> {selectedEdit.editorName}</p>
              <p><strong>Summary:</strong> {selectedEdit.summary}</p>
              <p><strong>Content:</strong> {selectedEdit.content}</p>
              <p><strong>Votes:</strong> {selectedEdit.upvote_count} upvotes and {selectedEdit.downvote_count} downvotes</p>
            </div>

            <div className="detail-card detail-card-wide">
              <span className="detail-label">Current live record</span>
              {selectedEdit.baseRecord ? (
                <>
                  <p><strong>Title:</strong> {selectedEdit.baseRecord.title}</p>
                  <p><strong>Summary:</strong> {selectedEdit.baseRecord.summary || "No summary"}</p>
                  <p><strong>Content:</strong> {selectedEdit.baseRecord.content || "No content"}</p>
                  <p><strong>Current edit id:</strong> {selectedEdit.baseRecord.current_edit_id || "None"}</p>
                </>
              ) : (
                <p>No base record could be found for this edit.</p>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="button button-primary" onClick={() => handleApprove(selectedEdit.id)}>
                <Check size={16} />
                Approve edit
              </button>
              <button type="button" className="button button-secondary" onClick={() => handleReject(selectedEdit.id)}>
                <X size={16} />
                Reject edit
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
