import React from 'react';
import './App.css';
import Join from './pages/Join';
import { Routes, Route } from "react-router-dom";

import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import WritePage from './pages/WritePage';
import NewsPage from './pages/NewsPage';
import RecommendationPage from './pages/RecommendationPage';
import InformationPage from './pages/InformationPage';
import Mypage from './pages/Mypage';


const App = () => {
  return (

    <div className="App">
      {/* <Join /> */}


      <box>
      <Routes>
        <Route element={<HomePage />} path='/'/>
        <Route element={<InformationPage />} path="/info" />
        <Route element={<RecommendationPage />} path="/rec" />
        <Route element={<CommunityPage />} path="/comm" />
        <Route element={<NewsPage />} path="/news" />
        <Route element={<WritePage />} path="/write" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Join />} path="/Join" />
        <Route element={<Mypage />} path="/Mypage" />
      </Routes>
      </box>
    </div>

  );
};
export default App;