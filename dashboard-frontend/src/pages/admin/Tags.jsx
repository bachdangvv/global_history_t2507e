import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AdminForm from "../../components/admin/AdminForm";
import AdminTable from "../../components/admin/AdminTable";
import { adminApi } from "../../services/api";

const initialForm = {
  id: "",
  name: "",
  description: "",
};

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [form, setForm] = useState(initialForm);

  async function loadTags() {
    setTags(await adminApi.getTags());
  }

  useEffect(() => {
    loadTags();
  }, []);

  function handleFieldChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.id) {
      await adminApi.updateTag(form.id, form);
    } else {
      await adminApi.createTag(form);
    }

    setForm(initialForm);
    await loadTags();
  }

  function handleEdit(tag) {
    setForm({
      id: tag.id,
      name: tag.name,
      description: tag.description,
    });
  }

  async function handleDelete(tagId) {
    await adminApi.deleteTag(tagId);
    if (form.id === tagId) {
      setForm(initialForm);
    }
    await loadTags();
  }

  const columns = [
    {
      key: "name",
      header: "Tag",
      render: (tag) => (
        <div className="table-primary">
          <strong>{tag.name}</strong>
          <p>{tag.description}</p>
        </div>
      ),
    },
    {
      key: "articleCount",
      header: "Articles",
    },
    {
      key: "actions",
      header: "Actions",
      render: (tag) => (
        <div className="table-actions">
          <button type="button" className="icon-button" onClick={() => handleEdit(tag)}>
            <Pencil size={16} />
          </button>
          <button
            type="button"
            className="icon-button icon-button-danger"
            onClick={() => handleDelete(tag.id)}
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
          <p className="section-kicker">Tags management</p>
          <h1>Tags</h1>
          <p>Maintain reusable labels that help editors connect articles across themes.</p>
        </div>
      </section>

      <section className="page-grid page-grid-two">
        <AdminForm
          title={form.id ? "Edit tag" : "Create tag"}
          description="Tags are flexible labels, so keep them compact and easy to reuse."
          fields={[
            { name: "name", label: "Name", placeholder: "Tag name" },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              placeholder: "How should editors use this tag?",
            },
          ]}
          values={form}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          submitLabel={form.id ? "Update tag" : "Create tag"}
          onCancel={form.id ? () => setForm(initialForm) : undefined}
        />

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">CRUD table</p>
              <h2>Tag inventory</h2>
              <p>Track which labels are active and how widely they are used across articles.</p>
            </div>
          </div>

          <AdminTable
            columns={columns}
            rows={tags}
            emptyTitle="No tags available"
            emptyText="Create a tag to start building reusable article labels."
          />
        </section>
      </section>
    </div>
  );
}
