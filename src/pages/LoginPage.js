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
      console.log(response.data);
      localStorage.setItem('jwt', token);
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
    <div className="container">
      <NavLink to="/">
        <div className="title"> AILION </div>
      </NavLink>
      <form onSubmit={handleLogin}>
        <label>
          <input
            type="text"
            placeholder="아이디"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username && (
            <div type="button" className="btn_clear" onClick={handleClearId}>
              <img
                className="btn_clear_img"
                alt="close_icon"
                src="img/clear.png"
              />
            </div>
          )}
        </label>
        <label>
          <input
            type="password"
            placeholder="비밀번호"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password && (
            <div
              type="button"
              className="btn_clear"
              onClick={handleClearPassword}
            >
              <img
                className="btn_clear_img"
                alt="close_icon"
                src="img/clear.png"
              />
            </div>
          )}
        </label>
        {loginError && <div className="error_message">{loginError}</div>}
        {loginError === "" && <div className="error_message"> </div>}
        <button className="btn_login" type="submit">
          로그인
        </button>
        <div className="txt_line"> 또는 </div>
        <div className="btn_col">
          <button className="btn_naver">네이버 로그인</button>
          <button className="btn_kakao">Kakao 로그인</button>
          <button className="btn_Google">Google 로그인</button>
        </div>
        <NavLink to="/Join">
          <div className="link_join">회원가입</div>
        </NavLink>
      </form>
    </div>
  );
};

export default LoginPage;
