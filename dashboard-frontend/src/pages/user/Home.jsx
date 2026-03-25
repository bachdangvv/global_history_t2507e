import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import ArticleCard from "../../components/user/ArticleCard";
import { userApi } from "../../services/api";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    category: "all",
    country: "all",
  });

  useEffect(() => {
    Promise.all([userApi.getCategories(), userApi.getCountries()]).then(([categoryList, countryList]) => {
      setCategories(categoryList);
      setCountries(countryList);
    });
  }, []);

  useEffect(() => {
    userApi.getArticles(filters).then(setArticles);
  }, [filters]);

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Home page</p>
          <h1>Published articles</h1>
          <p>Browse the article library, search by title, and filter by category or country.</p>
        </div>
      </section>

      <section className="panel-card">
        <div className="toolbar">
          <label className="search-input">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search title"
              value={filters.keyword}
              onChange={(event) =>
                setFilters((current) => ({ ...current, keyword: event.target.value }))
              }
            />
          </label>

          <div className="toolbar-group">
            <select
              value={filters.category}
              onChange={(event) =>
                setFilters((current) => ({ ...current, category: event.target.value }))
              }
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name.toLowerCase()}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={filters.country}
              onChange={(event) =>
                setFilters((current) => ({ ...current, country: event.target.value }))
              }
            >
              <option value="all">All countries</option>
              {countries.map((country) => (
                <option key={country.id} value={country.name.toLowerCase()}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="article-grid">
          {articles.length ? (
            articles.map((article) => <ArticleCard key={article.id} article={article} />)
          ) : (
            <div className="table-empty-state">
              <h3>No articles found</h3>
              <p>Try another keyword or adjust the selected filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
