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

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);

  async function loadCategories() {
    setCategories(await adminApi.getCategories());
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function handleFieldChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.id) {
      await adminApi.updateCategory(form.id, form);
    } else {
      await adminApi.createCategory(form);
    }

    setForm(initialForm);
    await loadCategories();
  }

  function handleEdit(category) {
    setForm({
      id: category.id,
      name: category.name,
      description: category.description,
    });
  }

  async function handleDelete(categoryId) {
    await adminApi.deleteCategory(categoryId);
    if (form.id === categoryId) {
      setForm(initialForm);
    }
    await loadCategories();
  }

  const columns = [
    {
      key: "name",
      header: "Category",
      render: (category) => (
        <div className="table-primary">
          <strong>{category.name}</strong>
          <p>{category.description}</p>
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
      render: (category) => (
        <div className="table-actions">
          <button type="button" className="icon-button" onClick={() => handleEdit(category)}>
            <Pencil size={16} />
          </button>
          <button
            type="button"
            className="icon-button icon-button-danger"
            onClick={() => handleDelete(category.id)}
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
          <p className="section-kicker">Categories management</p>
          <h1>Categories</h1>
          <p>Create, edit, and remove the taxonomy that structures article organization.</p>
        </div>
      </section>

      <section className="page-grid page-grid-two">
        <AdminForm
          title={form.id ? "Edit category" : "Create category"}
          description="Use concise names and clear descriptions so editors categorize content consistently."
          fields={[
            { name: "name", label: "Name", placeholder: "Category name" },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              placeholder: "How should editors use this category?",
            },
          ]}
          values={form}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          submitLabel={form.id ? "Update category" : "Create category"}
          onCancel={form.id ? () => setForm(initialForm) : undefined}
        />

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">CRUD table</p>
              <h2>Category inventory</h2>
              <p>Current categories and how many articles depend on each one.</p>
            </div>
          </div>

          <AdminTable
            columns={columns}
            rows={categories}
            emptyTitle="No categories available"
            emptyText="Create a category to start structuring article records."
          />
        </section>
      </section>
    </div>
  );
}
