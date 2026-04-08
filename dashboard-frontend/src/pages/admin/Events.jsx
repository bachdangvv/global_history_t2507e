import { Link2, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AdminForm from "../../components/admin/AdminForm";
import AdminTable from "../../components/admin/AdminTable";
import { adminApi } from "../../services/api";

const initialForm = {
  id: "",
  title: "",
  slug: "",
  summary: "",
  event_year: "",
  event_date: "",
};

function formatDate(value) {
  if (!value) return "Never";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(d);
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [message, setMessage] = useState("");

  async function loadEvents() {
    const [eventList, articleList] = await Promise.all([adminApi.getEvents(), adminApi.getArticles()]);
    setEvents(eventList);
    setArticles(articleList);
    setSelectedEventId((current) => current || String(eventList[0]?.id || ""));
    setSelectedArticleId((current) => current || String(articleList[0]?.id || ""));
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleFieldChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.id) {
      await adminApi.updateEvent(form.id, form);
    } else {
      await adminApi.createEvent(form);
    }

    setForm(initialForm);
    setMessage("");
    await loadEvents();
  }

  function handleEdit(eventItem) {
    setForm({
      id: eventItem.id,
      title: eventItem.title,
      slug: eventItem.slug,
      summary: eventItem.summary,
      event_year: eventItem.event_year,
      event_date: eventItem.event_date,
    });
  }

  async function handleDelete(eventId) {
    await adminApi.deleteEvent(eventId);
    if (form.id === eventId) {
      setForm(initialForm);
    }
    setMessage("");
    await loadEvents();
  }

  async function handleLinkArticle(event) {
    event.preventDefault();
    await adminApi.linkArticleToEvent(selectedEventId, selectedArticleId);
    setMessage("Article linked to historical event successfully.");
    await loadEvents();
  }

  const columns = [
    {
      key: "title",
      header: "Event",
      render: (eventItem) => (
        <div className="table-primary">
          <strong>{eventItem.title}</strong>
          <p>{eventItem.summary}</p>
        </div>
      ),
    },
    { key: "event_year", header: "Year" },
    { key: "linkedArticleCount", header: "Articles" },
    { key: "topicCount", header: "Topics" },
    {
      key: "currentEditStatus",
      header: "Edit status",
      render: (eventItem) => (
        <span className={`status-badge ${eventItem.currentEditStatus === "approved" ? "status-badge-success" : "status-badge-warning"}`}>
          {eventItem.currentEditStatus}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (eventItem) => (
        <div className="table-actions">
          <button type="button" className="icon-button" onClick={() => handleEdit(eventItem)}>
            <Pencil size={16} />
          </button>
          <button
            type="button"
            className="icon-button icon-button-danger"
            onClick={() => handleDelete(eventItem.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="section-kicker">Historical events</p>
          <h1>Events</h1>
          <p>Create event records and link article entries into the historical timeline.</p>
        </div>
      </section>

      {message ? <div className="notice-banner">{message}</div> : null}

      <section className="page-grid page-grid-two">
        <AdminForm
          title={form.id ? "Edit event" : "Create event"}
          description="Maintain clean event records so article and topic links stay meaningful."
          fields={[
            { name: "title", label: "Title", placeholder: "Historical event title" },
            { name: "slug", label: "Slug", placeholder: "event-slug" },
            { name: "event_year", label: "Event year", type: "number", placeholder: "1400" },
            { name: "event_date", label: "Event date", type: "date" },
            {
              name: "summary",
              label: "Summary",
              type: "textarea",
              placeholder: "Short explanation of the historical event",
            },
          ]}
          values={form}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          submitLabel={form.id ? "Update event" : "Create event"}
          onCancel={form.id ? () => setForm(initialForm) : undefined}
        />

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Link articles</p>
              <h2>Attach article to event</h2>
              <p>Create or confirm a record in the event-article join table.</p>
            </div>
          </div>

          <form className="admin-form" onSubmit={handleLinkArticle}>
            <label className="admin-field">
              <span>Event</span>
              <select value={selectedEventId} onChange={(event) => setSelectedEventId(event.target.value)}>
                {events.map((eventItem) => (
                  <option key={eventItem.id} value={eventItem.id}>
                    {eventItem.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-field">
              <span>Article</span>
              <select value={selectedArticleId} onChange={(event) => setSelectedArticleId(event.target.value)}>
                {articles.map((article) => (
                  <option key={article.id} value={article.id}>
                    {article.title}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-actions">
              <button type="submit" className="button button-primary">
                <Link2 size={16} />
                Link article
              </button>
            </div>
          </form>
        </section>
      </section>

      <section className="panel-card">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">CRUD table</p>
            <h2>Event registry</h2>
            <p>Historical events with current edit state and how many article records are linked to each one.</p>
          </div>
        </div>

        <AdminTable
          columns={columns}
          rows={events}
          emptyTitle="No events available"
          emptyText="Create an event to start linking article knowledge to the historical timeline."
        />
      </section>
    </div>
  );
}
