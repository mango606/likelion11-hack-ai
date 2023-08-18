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
          image: '/img/step1.png',
          description: '첫 번째 스텝 설명을 작성하세요.',
        },
        {
          title: 'AI 추천',
          image: '/img/step2.png',
          description: '두 번째 스텝 설명을 작성하세요.',
        },
        {
            title: '커뮤니티',
            image: '/img/step2.png',
            description: '두 번째 스텝 설명을 작성하세요.',
          },
          {
            title: '회원가입',
            image: '/img/step2.png',
            description: '두 번째 스텝 설명을 작성하세요.',
          },
      ];

    return (
        <div>
            <p id="home-title">AI, 어느 정도 아시나요?</p>
            <p id="home-subtitle">AI에 대한 정보 얻고 돈 벌기, AI 커뮤니티에서 함께 시작하세요!</p>
            <button id="home-btn" onClick={openHelpModal}>이용방법</button>

            {/* 도움말 모달 */}
            <Modal isOpen={isHelpModalOpen} onClose={closeHelpModal}>
                {/* 모달 내용 */}
                {helpContent[currentHelpStep] && (
                <>
                    <div id="help-up">
                    <p id="help-title">{helpContent[currentHelpStep].title}</p>
                    <img id="help-img" src="./img/home-x.png" onClick={closeHelpModal}></img>
                    </div>
                    <img src={helpContent[currentHelpStep].image} alt="Step" />
                    <p>{helpContent[currentHelpStep].description}</p>
                    <div id="help-btn">
                    {currentHelpStep > 0 && (
                    <button id="help-before" onClick={handlePrevStep}>이전</button>
                    )}
                    {currentHelpStep < helpContent.length - 1 ? (
                    <button id="help-next" onClick={handleNextStep}>다음</button>
                    ) : (
                    <button id="help-next" onClick={closeHelpModal}>닫기</button>
                    )}
                    </div>
                </>
                )}
            </Modal>
        </div>
    );
}
  
export default Home;