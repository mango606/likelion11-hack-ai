import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../Sidebar';

import './Mypage.css';

// 팝업창 부분
function EditPopup({ title, subtitle, value, newValue, onChange, onSave, radioOptions, selectedOption, onRadioChange}) {
  return (
    <div className="popup_layer">
      <div className='popup_layer_content'>
        <h2>{title}</h2>
        <div>
          <label>{subtitle}</label>
          {radioOptions ? (
            <div className="interest_radio">
              {radioOptions.map((option) => (
                <label key={option}>
                  <input
                    className='interest_index'
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={onRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <input
              type={value === 'Password' ? 'password' : 'text'}
              maxLength={value === 'Password' ? 8 : undefined}
              value={newValue}
              onChange={onChange}
            />
          )}
        </div>
        <div className='btn_popup' >
        <button onClick={onSave}>수정</button>

        </div>
      </div>
    </div>
  );
}

const PopupSection = ({ title, content, onClick, isOpen, children }) => (
  <div className='subindex_row'>
    <div className="content">{title}<br />{content}</div>
    <button className='btn_change' onClick={onClick}>수정</button>
    {isOpen && (
      <div className="dimmed" aria-hidden="true">
        {children}
      </div>
    )}
  </div>
);



const MyPage = () => {
  const [NicknamePopupOpen, setNicknamePopupOpen] = useState(false);
  const [EmailPopupOpen, setEmailPopupOpen] = useState(false);
  const [PasswordPopupOpen, setPasswordPopupOpen] = useState(false);
  const [BirthDatePopupOpen, setBirthDatePopupOpen] = useState(false);
  const [InterestsPopupOpen, setInterestsPopupOpen] = useState(false);

  const [nickname, setNickname] = useState('이름이름');
  const [email, setEmail] = useState('qwertasdf134@gmail.com');
  const [password, setPassword] = useState('password');
  const [birthDate, setBirthDate] = useState('20011111');
  const [interests, setInterests] = useState('영상');

  const [newNickname, setNewNickname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newBirthDate, setNewBirthDate] = useState('');
  const [selectedInterest, setSelectedInterest] = useState(interests);

  const interestOptions = ['영상', '음악', '글쓰기', '검색엔진', '없음'];


  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handlePopupToggle = (setter) => {
    setter((prevState) => !prevState);
  };
  
  const handleSaveChanges = (originalValue, newValue, setter, popupSetter, valueName) => {
    if (originalValue !== newValue && newValue.trim() !== '') {
      setter(newValue);
      console.log(`${valueName} 변경 : ${originalValue} -> ${newValue}`);
    }
    handlePopupToggle(popupSetter);
  };


  return (
    <>
      <Sidebar />
      <article className='container'>
      <div className="subindex_box">
          {/* 닉네임 */}
          <div className='profile'>
            <img className="profile_img" alt="프로필 이미지" src="img/default_profile.png" />
            <div className='myname'>
              <div className="content">닉네임 <br/>{nickname}</div>
              <button className='btn_change' onClick={() => handlePopupToggle(setNicknamePopupOpen)}>수정</button>
              {NicknamePopupOpen && (
                <div className="dimmed" aria-hidden="true">
                  <EditPopup
                    title="닉네임"
                    subtitle="별명을 수정 하실 수 있습니다"
                    value={nickname}
                    newValue={newNickname}
                    onChange={(event) => handleInputChange(event, setNewNickname)}
                    onSave={() => handleSaveChanges(nickname, newNickname, setNickname, setNicknamePopupOpen, "닉네임")}
                  />
                </div>
              )}
            </div>
          </div>
          {/* 이메일 */}
          <hr/>
          <PopupSection
            title="이메일"
            content={email}
            onClick={() => handlePopupToggle(setEmailPopupOpen)}
            isOpen={EmailPopupOpen}
          >
            <EditPopup
              title="이메일"
              subtitle="이메일을 수정 하실 수 있습니다"
              value={email}
              newValue={newEmail}
              onChange={(event) => handleInputChange(event, setNewEmail)}
              onSave={() => handleSaveChanges(email, newEmail, setEmail, setEmailPopupOpen, "이메일")}
            />
          </PopupSection>
          <hr/>
          {/* 비밀번호 */}
          <PopupSection
            title="비밀번호"
            content={password}
            onClick={() => handlePopupToggle(setPasswordPopupOpen)}
            isOpen={PasswordPopupOpen}
          >
            <EditPopup
              title="비밀번호"
              subtitle="비밀번호를 수정 하실 수 있습니다"
              value={password}
              newValue={newPassword}
              onChange={(event) => handleInputChange(event, setNewPassword)}
              onSave={() => handleSaveChanges(password, newPassword, setPassword, setPasswordPopupOpen, "비밀번호")}
            />
          </PopupSection>
          <hr/>
          {/* 생년월일 */}
          <PopupSection
            title="생년월일"
            content={birthDate}
            onClick={() => handlePopupToggle(setBirthDatePopupOpen)}
            isOpen={BirthDatePopupOpen}
          >
            <EditPopup
              title="생년월일"
              subtitle="생년월일을 수정 하실 수 있습니다"
              value={birthDate}
              newValue={newBirthDate}
              onChange={(event) => handleInputChange(event, setNewBirthDate)}
              onSave={() => handleSaveChanges(birthDate, newBirthDate, setBirthDate, setBirthDatePopupOpen, "생년월일")}
              />
          </PopupSection>
          <hr/>
          {/* 관심분야 */}
          <PopupSection
            title="관심분야"
            content={interests}
            onClick={() => handlePopupToggle(setInterestsPopupOpen)}
            isOpen={InterestsPopupOpen}
          >
            <EditPopup
              title="관심분야"
              subtitle="관심분야를 수정 하실 수 있습니다"
              value={interests}
              newValue={selectedInterest}
              radioOptions={interestOptions}
              selectedOption={selectedInterest}
              onRadioChange={(event) => setSelectedInterest(event.target.value)}
              onSave={() =>
                handleSaveChanges(
                  interests,
                  selectedInterest,
                  setInterests,
                  setInterestsPopupOpen,
                  "관심분야"
                )
              }
            />
          </PopupSection>
          </div>
      {/* 내 활동 내역 */}
      <div className="content_title">내 활동 내역</div>
      <div className="subindex_box">
        <div className="content">내 게시글</div>
        <hr/>
        <NavLink to="/MyComments">
        <div className="content">댓글 단 글</div>
        </NavLink>
      </div>
      {/* 문의 */}
      <div>문의는 <a href="mailto:qwer1234@likelion.org"> qwer1234@likelion.org</a>로 연락 바랍니다.</div>

      </article>
     
    </>
  );
};

export default MyPage;