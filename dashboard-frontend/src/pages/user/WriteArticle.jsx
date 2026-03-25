import { useEffect, useState } from "react";
import ArticleForm from "../../components/user/ArticleForm";
import { userApi } from "../../services/api";

const initialForm = {
  title: "",
  content: "",
  categoryId: "",
  country: "",
  editSummary: "",
};

export default function WriteArticlePage() {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([userApi.getCategories(), userApi.getCountries()]).then(([categoryList, countryList]) => {
      setCategories(categoryList);
      setCountries(countryList);
    });
  }, []);

  function handleChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await userApi.createRevision(form);
    setMessage("Revision submitted successfully. It is now pending admin approval.");
    setForm(initialForm);
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Write article</p>
          <h1>Create a new revision</h1>
          <p>You are not editing articles directly. Every submission becomes a pending revision.</p>
        </div>
      </section>

      {message ? <div className="notice-banner">{message}</div> : null}

      <ArticleForm
        title="Submit article draft"
        description="Fill in the article content and submit it as a revision for admin review."
        values={form}
        categories={categories}
        countries={countries}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Submit revision"
      />
    </div>
  );
}
