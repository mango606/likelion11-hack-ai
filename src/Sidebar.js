import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      <sidebar>
        <Link to="/">
          <img id="logo" alt="logo" src={`${process.env.PUBLIC_URL}/logo.png`} />
        </Link>
        <div className="menu">
          <Link to="/">
            <p id="home">Home</p>
          </Link>
          <Link to="/info">
            <p id="info">AI 정보</p>
          </Link>
          <Link to="/rec">
            <p id="rec">AI 추천</p>
          </Link>
          <Link to="/comm">
            <p id="comm">커뮤니티</p>
          </Link>
          <Link to="/news">
            <p id="news">AI 소식</p>
          </Link>
        </div>
        <Link to="/write">
          <button>글 작성</button>
        </Link>
        <Link to="/login">
          <button>로그인</button>
        </Link>
      </sidebar>
    </>
  );
};

export default Sidebar;