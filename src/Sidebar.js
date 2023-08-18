import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const [selectedMenu, setSelectedMenu] = useState("홈");

  // 메뉴 클릭
  const handleMenuClick = (menu) => {
    setSelectedMenu(selectedMenu => menu);
  };

  // 페이지가 로드될 때 실행되는 useEffect
  useEffect(() => {
    // 현재 페이지의 경로를 가져와서 selectedMenu 업데이트
    const currentPath = window.location.pathname;
    switch (currentPath) {
      case '/info':
        setSelectedMenu('AI 정보');
        break;
      case '/rec':
        setSelectedMenu('AI 추천');
        break;
      case '/comm':
        setSelectedMenu('커뮤니티');
        break;
      case '/news':
        setSelectedMenu('이용방법');
        break;
      // 추가적인 페이지 경로에 대한 처리
      default:
        setSelectedMenu('홈');
        break;
    }
  }, []);


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
        <div id="side-start">
        <Link to="/">
          <img id="logo" alt='logo' src="/img/logo.png" />
        </Link>
        <div className="menu">
          <Link to="/">
            <div id="side-menu"
              onClick={() => handleMenuClick("홈")}
              className={selectedMenu === "홈" ? "selected" : ""}
              >
            <img className="side-img" alt='home_icon' src="/img/side-home.png" />
            <a id="side-txt">
            홈
            </a>
            </div>
          </Link>
          <Link to="/info">
          <div id="side-menu"
              onClick={() => handleMenuClick("AI 정보")}
              className={selectedMenu === "AI 정보" ? "selected" : ""}
          >
            <img className="side-img" alt='info_icon' src="/img/side-info.png" />
            <a id="side-txt">
              AI 정보
            </a>
            </div>
          </Link>
          <Link to="/rec">
          <div id="side-menu"
              onClick={() => handleMenuClick("AI 추천")}
              className={selectedMenu === "AI 추천" ? "selected" : ""}
          >
            <img className="side-img" alt='rec_icon' src="/img/side-rec.png" />
            <a id="side-txt">
              AI 추천
              </a>
              </div>
          </Link>
          <Link to="/comm">
          <div id="side-menu"
              onClick={() => handleMenuClick("커뮤니티")}
              className={selectedMenu === "커뮤니티" ? "selected" : ""}
          >
            <img className="side-img" alt='comm_icon' src="/img/side-comm.png" />
            <a id="side-txt">
              커뮤니티
              </a>
              </div>
          </Link>
          <div id="side-menu"
              onClick={() => handleMenuClick("이용방법")}
              className={selectedMenu === "이용방법" ? "selected" : ""}
          >
            <img className="side-img" alt='help_icon' src="/img/side-help.png" />
            <a id="side-txt">
              이용방법
              </a>
              </div>
        </div>
        <Link to="/write">
          <button id="side-bt">글쓰기</button>
          <img id="side-user" alt='write_icon' src="/img/side-write.png" />
        </Link>

        </div>

        {localStorage.getItem('jwt') ? (
          <div>
          <button id="side-bt2" onClick={handleMypageClick}>마이페이지</button>
          <button id="side-bt2" onClick={handleLogout}>로그아웃</button>
          </div>
        ):(
          <Link to="/login">

          <button id="side-bt2">로그인</button>
          <img id="side-user" alt='user_icon' src="/img/user.png" />
        </Link>
        ) }

      </sidebar>
    </>
  );
};

export default Sidebar;
