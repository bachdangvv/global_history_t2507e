import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AdminForm from "../../components/admin/AdminForm";
import AdminTable from "../../components/admin/AdminTable";
import { adminApi } from "../../services/api";

const initialForm = {
  id: "",
  name: "",
  slug: "",
  description: "",
};

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState(initialForm);

  async function loadTopics() {
    setTopics(await adminApi.getTopics());
  }

  useEffect(() => {
    loadTopics();
  }, []);

  function handleFieldChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.id) {
      await adminApi.updateTopic(form.id, form);
    } else {
      await adminApi.createTopic(form);
    }

    setForm(initialForm);
    await loadTopics();
  }

  function handleEdit(topic) {
    setForm({
      id: topic.id,
      name: topic.name,
      slug: topic.slug,
      description: topic.description,
    });
  }

  async function handleDelete(topicId) {
    await adminApi.deleteTopic(topicId);
    if (form.id === topicId) {
      setForm(initialForm);
    }
    await loadTopics();
  }

  const columns = [
    {
      key: "name",
      header: "Topic",
      render: (topic) => (
        <div className="table-primary">
          <strong>{topic.name}</strong>
          <p>{topic.description}</p>
        </div>
      ),
    },
    { key: "slug", header: "Slug" },
    { key: "articleCount", header: "Articles" },
    { key: "eventCount", header: "Events" },
    {
      key: "actions",
      header: "Actions",
      render: (topic) => (
        <div className="table-actions">
          <button type="button" className="icon-button" onClick={() => handleEdit(topic)}>
            <Pencil size={16} />
          </button>
          <button
            type="button"
            className="icon-button icon-button-danger"
            onClick={() => handleDelete(topic.id)}
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
          <p className="section-kicker">Topics management</p>
          <h1>Topics</h1>
          <p>Create, edit, and remove topic nodes that connect articles and events in the schema.</p>
        </div>
      </section>

      <section className="page-grid page-grid-two">
        <AdminForm
          title={form.id ? "Edit topic" : "Create topic"}
          description="Use concise names and stable slugs so the historical graph stays consistent."
          fields={[
            { name: "name", label: "Name", placeholder: "Topic name" },
            { name: "slug", label: "Slug", placeholder: "topic-slug" },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              placeholder: "How should editors use this topic?",
            },
          ]}
          values={form}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          submitLabel={form.id ? "Update topic" : "Create topic"}
          onCancel={form.id ? () => setForm(initialForm) : undefined}
        />

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">CRUD table</p>
              <h2>Topic inventory</h2>
              <p>Current topic nodes and the number of article and event records attached to them.</p>
            </div>
          </div>

          <AdminTable
            columns={columns}
            rows={topics}
            emptyTitle="No topics available"
            emptyText="Create a topic to start structuring the schema graph."
          />
        </section>
      </section>
    </div>
  );
}
