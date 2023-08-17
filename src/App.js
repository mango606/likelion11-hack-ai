import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import Join from './pages/Join';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import WritePage from './pages/WritePage';
import NewsPage from './pages/NewsPage';
import RecommendationPage from './pages/RecommendationPage';
import InformationPage from './pages/InformationPage';
import DetailPage from './pages/DetailPage';
import Mypage from './pages/Mypage';
import MyCommentsPage from './pages/MyCommentsPage'
import MyPostPage from './pages/MyPostPage';

const App = () => {
  return (
    <div className="App">
      <box>
      <Routes>
        <Route path='/' element={<HomePage />} />  {/* 홈 */}
        <Route path="/info" element={<InformationPage />} />  {/* AI 정보ㅗ */}
        <Route path="/rec" element={<RecommendationPage />} />  {/* AI 추천 */}
        <Route path="/comm" element={<CommunityPage />} />  {/* 커뮤니티 */}
          <Route path='/comm/:userId/:postId' element={<DetailPage />}  />
        <Route path="/news" element={<NewsPage />} />   {/* AI 소식 */}
        <Route path="/write" element={<WritePage />} />   {/* 글 작성 */}
        <Route path="/login" element={<LoginPage />} />   {/* 로그인 */}
        <Route path="/join" element={<Join />} /> {/* 회원가입 */}
        <Route path="/mypage" element={<Mypage />} > {/* 마이페이지 */}
          <Route path="/mypage/posts" element={<MyPostPage />} />
          <Route path="/mypage/comments" element={<MyCommentsPage />} />
        </Route>
      </Routes>
      </box>
    </div>

  );
};
export default App;
