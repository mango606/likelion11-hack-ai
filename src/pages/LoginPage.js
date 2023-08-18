import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const LoginPage = () => {
  // 상태변수 선언
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  // 로그인 버튼 클릭시
  const handleLogin = async (e) => {
    e.preventDefault();


    if (username === "") {
      setLoginError("아이디를 입력해주세요.");
      return;
    }

    else if (password === "") {
      setLoginError("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post('/ailion/api/authenticate', { username, password });
      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem('jwt', token);
      localStorage.setItem('userId', userId);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  //아이디랑 비밀번호 입력값을 지우는 함수
  const handleClearId = () => {
    setUsername("");
  };
  const handleClearPassword = () => {
    setPassword("");
  };


return (
  <div className="login-container">
      <NavLink to="/">
            <img className="login-logo" alt="로고 이미지" src="img/logo.png" />
      </NavLink>
      <form onSubmit={handleLogin} className="login-form">
            <div className="login-box">
                  <div className="inp-text">
                        <label for="loginId" className="screen-out">아이디</label>
                        <input
                              className="login-input"
                              type="text"
                              placeholder="아이디"
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                        />
                        {username && <div type="button" className="btn-clear" onClick={handleClearId}>
                              <img className="btn-clear-img" alt="close_icon" src="img/clear.png" />
                        </div>}
                  </div>
                  <div className="inp-text">
                        <label for="loginPw" className="screen-out">비밀번호</label>
                        <input
                              className="login-input"
                              type="password"
                              placeholder="비밀번호"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                        />
                        {password && <div type="button" className="btn-clear" onClick={handleClearPassword}>
                              <img className="btn-clear-img" alt="close-icon" src="img/clear.png" />
                        </div>}
                  </div>
            </div>
                  {loginError && <div className="error-message">{loginError}</div>}
                  {loginError === '' && <div className="error-message"> </div>}
                  <button className="btn-login" type="submit">로그인</button>
      </form>
      <NavLink to="/Join">
            <div className="link-join">회원가입</div>
      </NavLink>
  </div>
);
}


export default LoginPage;
