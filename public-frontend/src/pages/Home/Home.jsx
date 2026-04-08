import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchEvents, fetchTopArticles, fetchRecommendedArticles, fetchSearchResults, fetchBooks, fetchAuthors, fetchExhibitions } from '../../services/api';
import './Home.css';

import TopRevisions from '../../components/Home/TopRevisions/TopRevisions';
import TopArticle from '../../components/Home/TopArticle/TopArticle';
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import HistoryEvents from '../../components/Home/HistoryEvents/HistoryEvents';

const Home = ({ sidebarOpen }) => {
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  const { data: events = [] } = useQuery({ queryKey: ['events'], queryFn: fetchEvents });
  const { data: topArticles = [] } = useQuery({ queryKey: ['topArticles'], queryFn: fetchTopArticles });
  const { data: recentArticles = [] } = useQuery({ queryKey: ['recentArticles'], queryFn: fetchRecommendedArticles });
  const { data: searchArticles = [] } = useQuery({ queryKey: ['searchArticles'], queryFn: () => fetchSearchResults('') });
  const { data: books = [] } = useQuery({ queryKey: ['books'], queryFn: fetchBooks });
  const { data: authors = [] } = useQuery({ queryKey: ['authors'], queryFn: fetchAuthors });
  const { data: exhibitions = [] } = useQuery({ queryKey: ['exhibitions'], queryFn: fetchExhibitions });

  // Dynamic compute
  const mappedCategories = categories.map(c => ({ ...c, icon: c.icon || '📌' }));
  const mappedEvents = events.map(e => ({...e, event_date: e.eventDate || `${e.eventYear}-01-01`, view_count: e.viewCount || 0}));
  
  // Extract unique countries
  const extractCountries = () => {
    const unique = new Set();
    const result = [];
    const all = [...topArticles, ...searchArticles, ...recentArticles];
    all.forEach(a => {
      if (a.country && !unique.has(a.country)) {
        unique.add(a.country);
        result.push({ id: a.country, name: a.country, code: a.country, flag: '📍' });
      }
    });
    return result;
  };
  const dynamicCountries = extractCountries();

  return (
    <div className={`home-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar — always rendered, grid column on desktop, overlay on mobile */}
      <aside className="home-sidebar-col">
        <Sidebar 
          data={mappedCategories} 
          books={books}
          authors={authors}
          exhibitions={exhibitions}
          sidebarOpen={sidebarOpen} 
        />
      </aside>

      {/* Main grid content */}
      <div className="home-layout">
        {/* Topbar */}
        <div className="home-area-topbar">
          <TopRevisions 
            recentArticles={recentArticles || topArticles}
          />
        </div>
        
        {/* Articles (Left Main) */}
        <div className="home-area-articles">
          <TopArticle 
            topLikeData={topArticles.map(a => ({...a, like_count: a.likes || 0, view_count: a.views || 0}))} 
            topViewData={searchArticles.map(a => ({...a, view_count: a.views || 0, like_count: a.likes || 0}))}
            recentData={recentArticles.map(a => ({...a, view_count: a.views || 0, like_count: a.likes || 0}))}
            countries={dynamicCountries}
          />
        </div>
        
        {/* Events (Right Main) */}
        <div className="home-area-events">
          <HistoryEvents data={mappedEvents} />
        </div>
      </div>
    </div>
  );
};

export default Home;