// Join.js
import React from 'react';
import './Join.css';
import useForm from '../components/useForm';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

    music,
    video,
    novel,
    search,
    handleInterestChange,
    isDuplicated,
    handleIdDuplication
    } = useForm();

    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
        "name" : Id,
        "email": email,
        "nickname": Nickname,
        "password": password,
        "recommends": {
          "MUSIC" : parseInt(music),
          "SEARCH" : parseInt(search),
          "VIDEO" : parseInt(video),
          "NOVEL" : parseInt(novel),
        },
        "username": Id
      };

    try {
      const response = await axios.post('/ailion/api/signup/', user);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
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

  if (localStorage.getItem('jwt')) {
    navigate('/');
  }

  return (
  <div className="joinForm">
    <div className="jForm">
      <a href="/"><img className="joinLogo" alt="logo" src="img/logo.png"></img></a>

    <div className={`form_list ${idFocused ? 'focused' : ''}`}>
    <div className="idForm">
        <img className="idImg" src="img/id.png" alt="user" width="20px" height="20px" />
        <input className="joinInput" type="text"
        onFocus={() => setIdFocused(true)}
        onBlur={() => setIdFocused(false)}
        placeholder='아이디' value={Id} onChange={handleIdChange} disabled={isDuplicated === true} />
        <button className="dupButton" onClick={handleIdDuplication}>중복 체크</button>
      </div>
    </div>

    <div className="errorList">
      {isDuplicated && <p className={isDuplicated === true ? 'trueMessage' : 'errorMessage'}>{isDuplicated === true ? "중복확인 되었습니다.": "아이디가 중복됩니다."}</p>}
    </div>
    <div className="errorList">
      {IdError && <p className='errorMessage'> 아이디는 5~15자리의 영문 대소문자와 숫자로만 입력해주세요.</p>}
    </div>



      <div className={`form_list ${emailFocused ? 'focused' : ''}`}>
      <div className="emailForm">
        <img className="emailImg" src="img/mail.png" alt="mail" width="20px" height="20px" />
        <input className="joinInput" type="email"
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        placeholder='이메일' value={email} onChange={handleEmailChange} />
      </div>
      </div>

      <div className="errorList">
      {emailError && <p className='errorMessage'>이메일 형식이 잘못되었습니다.</p>}
    </div>


      <div className={`form_list ${passwordFocused ? 'focused' : ''}`}>
      <div className="passwordForm">
        <img className="passwordImg" src="img/password.png" alt="password" width="20px" height="20px" />
        <input className="joinInput" type={inputType}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        placeholder='비밀번호' value={password} onChange={handlePasswordChange} />
        <img className="passwordViewImg" src={imgView} alt="view" width="20px" height="20px" onClick={togglePasswordVisibility}/>
      </div>
      </div>


      <div className="errorList">
      {passwordError && <p className='errorMessage'>비밀번호는 8자리 이상이며 숫자, 대소문자 알파벳을 포함해야 합니다.</p>}
    </div>

      <div className={`form_list ${passwordCheckFocused ? 'focused' : ''}`}>
      <div className="passwordCheckForm">
        <img className="passwordCheckImg" src="img/passwordCheck.png" alt="password" width="20px" height="20px" />
        <input className="joinInput" type="password"
        onFocus={() => setPasswordCheckFocused(true)}
        onBlur={() => setPasswordCheckFocused(false)}
        placeholder='비밀번호 확인' value={passwordCheck} onChange={handlePasswordSame} />
      </div>

      </div>


    <div className="errorList">
      {(!passwordError && passwordCheckError) && <p className='errorMessage'>비밀번호가 다릅니다.</p>}
    </div>



    <div className={`form_list ${birthFocused ? 'focused' : ''}`}>
      <div className="birthForm">
        <img className="birthImg" src="img/birth.png" alt="birth" width="20px" height="20px" />
        <input className="joinInput" type="text"
        onFocus={() => setBirthFocused(true)}
        onBlur={() => setBirthFocused(false)}
        placeholder='생년월일 8자' value={Birth} onChange={handleBirthChange} />
      </div>
    </div>

    <div className="errorList">
      {BirthError && <p className='errorMessage'> 올바른 생년월일 8자를 입력해주세요</p>}
    </div>


      <div className={`form_list ${nicknameFocused ? 'focused' : ''}`}>
      <div className="nicknameForm">
        <img className="nicknameImg" src="img/nickname.png" alt="nickname" width="20px" height="20px" />
        <input className="joinInput" type="text"
        onFocus={() => setNicknameFocused(true)}
        onBlur={() => setNicknameFocused(false)}
        placeholder='닉네임' value={Nickname} onChange={handleNicknameChange} />
      </div>
    </div>

    <div className="errorList">
      {NicknameError && <p className='errorMessage'> 닉네임을 2글자 이상 10 글자 이하로 입력해주세요.</p>}
    </div>

    <div className="interestForm">
    <div className="interestWords">흥미지수를 선택해주세요 (1~4)</div>

    <div className="interestWord">음악</div>
    <div>
    <input className="radioButton" type="radio" name="music" value="1" defaultChecked onClick={handleInterestChange}></input>
    <input className="radioButton" type="radio" name="music" value="2" onClick={handleInterestChange} ></input>
    <input className="radioButton" type="radio" name="music" value="3" onClick={handleInterestChange} ></input>
    <input className="radioButton" type="radio" name="music" value="4" onClick={handleInterestChange} ></input>
    </div>


    <div className="interestWord">영상</div>
    <div>
    <input className="radioButton" type="radio" name="video" value="1" defaultChecked onClick={handleInterestChange}></input>
    <input className="radioButton" type="radio" name="video" value="2" onClick={handleInterestChange} ></input>
    <input className="radioButton" type="radio" name="video" value="3" onClick={handleInterestChange} ></input>
    <input className="radioButton" type="radio" name="video" value="4" onClick={handleInterestChange} ></input>
    </div>


    <div className="interestWord">소설</div>
    <div>
    <input className="radioButton" type="radio" name="novel" value="1" defaultChecked onClick={handleInterestChange}></input>
    <input className="radioButton" type="radio" name="novel" value="2" onClick={handleInterestChange}></input>
    <input className="radioButton" type="radio" name="novel" value="3" onClick={handleInterestChange}></input>
    <input className="radioButton" type="radio" name="novel" value="4" onClick={handleInterestChange}></input>
    </div>

    <div className="interestWord">검색엔진</div>
    <div>
    <input className="radioButton" type="radio" name="search" value="1" defaultChecked onClick={handleInterestChange}></input>
    <input className="radioButton" type="radio" name="search" value="2" onClick={handleInterestChange}></input>
    <input className="radioButton" type="radio" name="search" value="3" onClick={handleInterestChange}></input>
    <input className="radioButton" type="radio" name="search" value="4" onClick={handleInterestChange}></input>
    </div>



    </div>






    <div className="buttonWrap">
        <button
        className="w-btn w-btn-indigo"
        type="submit"
        onClick={handleSubmit}
        disabled={
          passwordError || emailError || IdError || passwordCheckError ||
          !Id || NicknameError || BirthError || !Nickname || !Birth || !password ||
          !passwordCheck || !email  || !isDuplicated }>
        회원가입
        </button>
    </div>
    </div>
  </div>
  );
};

export default Join;
