import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleForm from "../../components/user/ArticleForm";
import { userApi } from "../../services/api";

export default function EditArticlePage() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    categoryId: "",
    country: "",
    editSummary: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([userApi.getArticle(id), userApi.getCategories(), userApi.getCountries()]).then(
      ([article, categoryList, countryList]) => {
        setForm({
          title: article.title,
          content: article.content,
          categoryId: article.categoryId,
          country: article.country,
          editSummary: "",
        });
        setCategories(categoryList);
        setCountries(countryList);
      },
    );
  }, [id]);

  function handleChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await userApi.createRevision({
      articleId: id,
      ...form,
    });
    setMessage("Your edit was submitted as a pending revision.");
    setForm((current) => ({
      ...current,
      editSummary: "",
    }));
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Edit article</p>
          <h1>Submit article changes</h1>
          <p>Edits are saved as revisions and must be reviewed before they affect the article.</p>
        </div>
      </section>

      {message ? <div className="notice-banner">{message}</div> : null}

      <ArticleForm
        title="Edit existing article"
        description="Update the article and describe what changed in the summary field."
        values={form}
        categories={categories}
        countries={countries}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Submit edit revision"
      />
    </div>
  );
}
