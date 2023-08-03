import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      <sidebar>
        <Link to="/">
          <img id="logo" alt='logo' src="./logo.png" />
        </Link>
        <div className="menu">
          <Link to="/">
            <p id="side-menu">
            <img class="side-img" alt='home_icon' src="./home.png" />
            <a id="side-txt">
            Home
            </a>
            </p>
          </Link>
          <Link to="/info">
            <p id="side-menu">
            <img class="side-img" alt='edit_icon' src="./edit.png" />
            <a id="side-txt">
              AI 정보
            </a>
            </p>
          </Link>
          <Link to="/rec">
            <p id="side-menu">
            <img class="side-img" alt='flag_icon' src="./flag.png" />
            <a id="side-txt">
              AI 추천
              </a>
              </p>
          </Link>
          <Link to="/comm">
            <p id="side-menu">
            <img class="side-img" alt='globe_icon' src="./globe.png" />
            <a id="side-txt">
              커뮤니티
              </a>
              </p>
          </Link>
          <Link to="/news">
            <p id="side-menu">
            <img class="side-img" alt='marker_icon' src="./marker.png" />
            <a id="side-txt">
              AI 소식
              </a>
              </p>
          </Link>
        </div>
        <Link to="/write">
          <button id="side-bt">+ 글 작성</button>
        </Link>
        <Link to="/login">
          <button id="side-bt2">로그인</button>
        </Link>
      </sidebar>
    </>
  );
};

export default Sidebar;