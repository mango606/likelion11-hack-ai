// Join.js
import React from 'react';
import './Join.css';
import useForm from './useForm';
import { useState } from 'react';

const Join = () => {
  const {
    Id,
    IdError,
    Nickname,
    NicknameError,
    Birth,
    BirthError,
    email,
    emailError,
    password,
    passwordError,
    passwordCheck,
    passwordCheckError,
    handleIdChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordSame,
    handleNicknameChange,
    handleBirthChange,
    interest,
    handleInterestChange,
    isDuplicated,
    handleIdDuplication
    } = useForm();


  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      Id,
      email,
      password,
      Nickname,
      Birth,
      interest
    };
    console.log(user);
  }

  const [idFocused, setIdFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordCheckFocused, setPasswordCheckFocused] = useState(false);
  const [birthFocused, setBirthFocused] = useState(false);
  const [nicknameFocused, setNicknameFocused] = useState(false);

  const [inputType, setInputType] = useState('password');
  const [imgView, setImgView] = useState('img/view.png');

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
    setImgView(imgView === 'img/view.png' ? 'img/hide.png' : 'img/view.png');
  }

  return (
  <div className="joinForm">
    <form onSubmit={handleSubmit}>
      <h2>AILION</h2>

    <div className="form_list">
    <div className={`idForm ${idFocused ? 'focused' : ''}`}>
        <img className="idImg" src="img/id.png" alt="user" width="20px" height="20px" />
        <input type="text"
        onFocus={() => setIdFocused(true)}
        onBlur={() => setIdFocused(false)}
        placeholder='아이디' value={Id} onChange={handleIdChange} />
        <button onClick={handleIdDuplication}>중복 체크</button>
      </div>

      <div className={`emailForm ${emailFocused ? 'focused' : ''}`}>
        <img className="emailImg" src="img/mail.png" alt="mail" width="20px" height="20px" />
        <input type="email"
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        placeholder='이메일' value={email} onChange={handleEmailChange} />
      </div>
      <div className={`passwordForm ${passwordFocused ? 'focused' : ''}`}>
        <img className="passwordImg" src="img/password.png" alt="password" width="20px" height="20px" />
        <input type={inputType}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        placeholder='비밀번호' value={password} onChange={handlePasswordChange} />
        <img className="passwordViewImg" src={imgView} alt="view" width="20px" height="20px" onClick={togglePasswordVisibility}/>
      </div>

      <div className={`passwordCheckForm ${passwordCheckFocused ? 'focused' : ''}`}>
        <img className="passwordCheckImg" src="img/passwordCheck.png" alt="password" width="20px" height="20px" />
        <input type="password"
        onFocus={() => setPasswordCheckFocused(true)}
        onBlur={() => setPasswordCheckFocused(false)}
        placeholder='비밀번호 확인' value={passwordCheck} onChange={handlePasswordSame} />
      </div>
    </div>

    <div className="errorList">
      {isDuplicated !== null && (
        <p className='errorMessage'>{isDuplicated ? '아이디가 중복됩니다.' : '사용 가능한 아이디입니다.'}</p>
      )}
      {IdError && <p className='errorMessage'> 아이디는 5~15자리의 영문 대소문자와 숫자로만 입력해주세요.</p>}
      {emailError && <p className='errorMessage'>이메일 형식이 잘못되었습니다.</p>}
      {passwordError && <p className='errorMessage'>비밀번호는 8자리 이상이며 숫자, 대소문자 알파벳을 포함해야 합니다.</p>}
      {(!passwordError && passwordCheckError) && <p className='errorMessage'>비밀번호가 다릅니다.</p>}
    </div>

    <div className="form_list">
      <div className={`birthForm ${birthFocused ? 'focused' : ''}`}>
        <img className="birthImg" src="img/birth.png" alt="birth" width="20px" height="20px" />
        <input type="text"
        onFocus={() => setBirthFocused(true)}
        onBlur={() => setBirthFocused(false)}
        placeholder='생년월일 8자' value={Birth} onChange={handleBirthChange} />
      </div>

      <div className={`nicknameForm ${nicknameFocused ? 'focused' : ''}`}>
        <img className="nicknameImg" src="img/nickname.png" alt="nickname" width="20px" height="20px" />
        <input type="text"
        onFocus={() => setNicknameFocused(true)}
        onBlur={() => setNicknameFocused(false)}
        placeholder='닉네임' value={Nickname} onChange={handleNicknameChange} />
      </div>
    </div>
    <div className="interestForm">
    관심 있는 분야 :
    <select name="interest" onChange={handleInterestChange} value={interest}>
        <option value="음악">음악</option>
        <option value="영상">영상</option>
        <option value="글쓰기">글쓰기</option>
        <option value="검색엔진">검색엔진</option>
        <option value="없음">없음</option>
    </select>
    </div>


    <div className="errorList">
      {BirthError && <p className='errorMessage'> 올바른 생년월일 8자를 입력해주세요</p>}
      {NicknameError && <p className='errorMessage'> 닉네임을 2글자 이상 10 글자 이하로 입력해주세요.</p>}
    </div>

    <div className="buttonWrap">
        <button className="w-btn w-btn-indigo" type="submit" disabled={passwordError || emailError || IdError || passwordCheckError || !Id || NicknameError || BirthError }>
        회원가입
        </button>
    </div>

    </form>
  </div>
  );
};

export default Join;
