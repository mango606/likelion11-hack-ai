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
import DetailPage from './pages/detail';
import Mypage from './pages/Mypage';
import MyCommentsPage from './pages/MyCommentsPage'
import MyPostPage from './pages/MyPostPage';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <div className="App">
       
      <box className="box">
      <Routes>
        <Route element={<HomePage />} path='/'/>
        <Route element={<InformationPage />} path="/info" />
        <Route element={<RecommendationPage />} path="/rec" />
        <Route element={<CommunityPage />} path="/comm" />
        <Route element={<NewsPage />} path="/news" />
        <Route element={<WritePage />} path="/write" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Join />} path="/join" />
        <Route element={<DetailPage />} path="/detail" />
        <Route element={<Mypage />} path="/mypage">
          <Route path="/mypage/posts" element={<MyPostPage />} />

        </Route>
        <Route path="/comments" element={<MyCommentsPage />} />
      </Routes>
      </box>
    </div>

  );
};
export default App;
