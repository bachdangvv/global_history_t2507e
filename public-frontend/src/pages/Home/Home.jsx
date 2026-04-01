import React from 'react';
import './Home.css';
import { mockData } from '../../mockData';

import TopRevisions from '../../components/Home/TopRevisions/TopRevisions';
import TopArticle from '../../components/Home/TopArticle/TopArticle';
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import HistoryEvents from '../../components/Home/HistoryEvents/HistoryEvents';

const Home = ({ sidebarOpen }) => {
  return (
    <div className={`home-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar — always rendered, grid column on desktop, overlay on mobile */}
      <aside className="home-sidebar-col">
        <Sidebar data={mockData.categories} sidebarOpen={sidebarOpen} />
      </aside>

      {/* Main grid content */}
      <div className="home-layout">
        {/* Topbar */}
        <div className="home-area-topbar">
          <TopRevisions 
            topUpvoteData={mockData.topUpvoteRevisions} 
            recentData={mockData.recentRevisionsDiffs} 
          />
        </div>
        
        {/* Articles (Left Main) */}
        <div className="home-area-articles">
          <TopArticle 
            topLikeData={mockData.topLikeArticles} 
            topViewData={mockData.topViewArticles}
            recentData={mockData.recentArticles}
            countries={mockData.countries}
          />
        </div>
        
        {/* Events (Right Main) */}
        <div className="home-area-events">
          <HistoryEvents data={mockData.historicalEvents} />
        </div>
      </div>
    </div>
  );
};

export default Home;