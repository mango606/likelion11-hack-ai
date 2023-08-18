import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from './components/Modal';

const Sidebar = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [currentHelpStep, setCurrentHelpStep] = useState(0);
  
    const openHelpModal = () => {
      setIsHelpModalOpen(true);
      setCurrentHelpStep(0); // 모달 열릴 때 첫 번째 스텝으로 초기화
    };
  
    const closeHelpModal = () => {
      setIsHelpModalOpen(false);
      setCurrentHelpStep(0); // 모달 닫을 때 스텝 초기화
    };
  
    const handleNextStep = () => {
      if (currentHelpStep < helpContent.length - 1) {
        setCurrentHelpStep(currentHelpStep + 1);
      }
    };
  
    const handlePrevStep = () => {
      if (currentHelpStep > 0) {
        setCurrentHelpStep(currentHelpStep - 1);
      }
    };

    const helpContent = [
        {
          title: 'AI 정보',
          image: './img/help1.png',
          description: 'AI 정보 목록에서 각종 AI의 정보를 확인해 보세요.',
        },
        {
          title: 'AI 추천',
          image: './img/help2.png',
          description: 'AI 추천 목록에서 사용자 맞춤형 AI 추천 정보를 확인해 보세요.',
        },
        {
            title: '커뮤니티',
            image: './img/help3.png',
            description: '커뮤니티 목록에서 다른 사용자들과 함께 의견을 나누어 보세요.',
          },
          {
            title: '회원가입',
            image: './img/help4.png',
            description: '회원가입을 통해 마이페이지에서 활동 내역을 확인할 수 있어요.',
          },
      ];

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
              onClick={openHelpModal}
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

<Modal isOpen={isHelpModalOpen} onClose={closeHelpModal}>
                {/* 모달 내용 */}
                {helpContent[currentHelpStep] && (
                <div id="help-box">
                    <div id="help-up">
                        <p id="help-title">{helpContent[currentHelpStep].title}</p>
                        <img id="help-img" src="./img/home-x.png" onClick={closeHelpModal} style={{ cursor: 'pointer' }}></img>
                    </div>
                    <div id="help-middle">
                        <img id="help-upload" src={helpContent[currentHelpStep].image} alt="Image" />
                        <p id="help-txt">{helpContent[currentHelpStep].description}</p>
                    </div>
                    <div id="help-btn">
                    {currentHelpStep > 0 && (
                    <button id="help-before" onClick={handlePrevStep} style={{ cursor: 'pointer' }}>이전</button>
                    )}
                    {currentHelpStep < helpContent.length - 1 ? (
                    <button id="help-next" onClick={handleNextStep} style={{ cursor: 'pointer' }}>다음</button>
                    ) : (
                    <button id="help-next" onClick={closeHelpModal} style={{ cursor: 'pointer' }}>닫기</button>
                    )}
                    </div>
                </div>
                )}
            </Modal>

      </sidebar>
    </>
  );
};

export default Sidebar;
