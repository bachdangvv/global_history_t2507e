import { Navigate, Outlet, Route, Routes, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminSidebar from "./components/admin/AdminSidebar";
import UserSidebar from "./components/user/UserSidebar";
import ArticlesPage from "./pages/admin/Articles";
import CategoriesPage from "./pages/admin/Categories";
import DashboardPage from "./pages/admin/Dashboard";
import EditsPage from "./pages/admin/Edits";
import EventsPage from "./pages/admin/Events";
import TagsPage from "./pages/admin/Tags";
import TopicsPage from "./pages/admin/Topics";
import UsersPage from "./pages/admin/Users";
import ArticleDetailPage from "./pages/user/ArticleDetail";
import EditArticlePage from "./pages/user/EditArticle";
import HomePage from "./pages/user/Home";
import NotificationsPage from "./pages/user/Notifications";
import ProfilePage from "./pages/user/Profile";
import WriteArticlePage from "./pages/user/WriteArticle";
import CreateArticlePage from "./pages/user/CreateArticle";

function AdminLayout() {
  return (
    <div className="app-frame">
      <AdminSidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

function UserLayout() {
  return (
    <div className="app-frame user-frame">
      <UserSidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      searchParams.delete('token');
      const newUrl = window.location.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      navigate(newUrl, { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="edits" element={<EditsPage />} />
        <Route path="topics" element={<TopicsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="tags" element={<TagsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="articles/:id" element={<ArticleDetailPage />} />
        <Route path="articles/:id/edit" element={<EditArticlePage />} />
        <Route path="create" element={<CreateArticlePage />} />
        <Route path="write" element={<WriteArticlePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
