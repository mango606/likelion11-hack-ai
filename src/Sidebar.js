import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate();

  const handleMypageClick = () => {

    axios.get('ailion/user/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then((res) => {
      const queryParams = new URLSearchParams({
        id: res.data.id,
        username: res.data.username,
        password: res.data.password,
        email: res.data.email,
        interest: res.data.interest,
        nickname: res.data.nickname,
        birth: res.data.birth,
      });
      console.log(res.data);
      navigate(`/Mypage?${queryParams}`);
    })
    .catch((err) => {
      console.log(err);
      navigate('/login');
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  }

  return (
    <>
      <sidebar>
        <Link to="/">
          <img id="logo" alt='logo' src="img/logo.png" />
        </Link>
        <div className="menu">
          <Link to="/">
            <p id="side-menu">
            <img className="side-img" alt='home_icon' src="img/home.png" />
            <a id="side-txt">
            Home
            </a>
            </p>
          </Link>
          <Link to="/info">
            <p id="side-menu">
            <img className="side-img" alt='edit_icon' src="img/edit.png" />
            <a id="side-txt">
              AI 정보
            </a>
            </p>
          </Link>
          <Link to="/rec">
            <p id="side-menu">
            <img className="side-img" alt='flag_icon' src="img/flag.png" />
            <a id="side-txt">
              AI 추천
              </a>
              </p>
          </Link>
          <Link to="/comm">
            <p id="side-menu">
            <img className="side-img" alt='globe_icon' src="img/globe.png" />
            <a id="side-txt">
              커뮤니티
              </a>
              </p>
          </Link>
          <Link to="/news">
            <p id="side-menu">
            <img className="side-img" alt='marker_icon' src="img/marker.png" />
            <a id="side-txt">
              AI 소식
              </a>
              </p>
          </Link>
        </div>
        <Link to="/write">
          <button id="side-bt">+ 글 작성</button>
        </Link>
        {localStorage.getItem('jwt') ? (
          <div>
          <button id="side-bt2" onClick={handleMypageClick}>마이페이지</button>
          <button id="side-bt2" onClick={handleLogout}>로그아웃</button>
          </div>
        ):(
          <Link to="/login">
          <button id="side-bt2">로그인</button>
        </Link>
        ) }

      </sidebar>
    </>
  );
};

export default Sidebar;
