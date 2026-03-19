import React from 'react';
import './Home.css';
import { mockData } from '../../mockData';

import SearchBar from '../../components/Home/SearchBar/SearchBar';
import TopRevisions from '../../components/Home/TopRevisions/TopRevisions';
import TopArticle from '../../components/Home/TopArticle/TopArticle';
import CountryList from '../../components/Home/CountryList/CountryList';
import CategoryList from '../../components/Home/CategoryList/CategoryList';
import RecentRevisions from '../../components/Home/RecentRevisions/RecentRevisions';
import RecentArticles from '../../components/Home/RecentArticles/RecentArticles';

const Home = () => {
  return (
    <div className="home-container">
      <SearchBar />
      
      <div className="home-grid">
        <div className="home-grid-left">
          <TopRevisions data={mockData.topUpvoteRevision} />
          <CountryList data={mockData.countries} />
          <RecentRevisions data={mockData.recentRevisions} />
        </div>
        
        <div className="home-grid-right">
          <TopArticle data={mockData.topLikeArticle} />
          <CategoryList data={mockData.categories} />
          <RecentArticles data={mockData.recentArticles} />
        </div>
      </div>
    </div>
  );
};

export default Home;