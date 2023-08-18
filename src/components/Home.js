import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal'; // 모달 컴포넌트를 불러옵니다.
import './Home.css';

function Home() {
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

    return (
        <div>
            <p id="home-title">AI, 어느 정도 아시나요?</p>
            <p id="home-subtitle">AI에 대한 정보 얻고 돈 벌기, AI 커뮤니티에서 함께 시작하세요!</p>
            <button id="home-btn" onClick={openHelpModal} style={{ cursor: 'pointer' }}>이용방법</button>

            {/* 도움말 모달 */}
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
        </div>
    );
}
  
export default Home;