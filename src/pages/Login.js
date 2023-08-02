import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
// import axios from 'axios';

import './Login.css'

const Login = () =>{
      // 상태변수 선언
      const [id, setId] = useState('');
      const [password, setPassword] = useState('');
      const [loginError, setLoginError] = useState('');
      

      // 로그인 버튼 클릭시
      const handleLogin = async (e) => {
            e.preventDefault();

            if (id === '') {
                  setLoginError('아이디를 입력해주세요.');
                  return;
            }
            else if (password === '') {
                  setLoginError('비밀번호를 입력해주세요.');
                  return;
            }

            console.log(`id: ${id}, Password: ${password}`);
            if (id === '1234' && password === 'qwer') {
                  console.log('로그인 성공');
                  setLoginError('');
                } else {
                  console.log('로그인 실패');
                  setLoginError('아이디 또는 비밀번호를 잘못 입력했습니다.');
                }
                        // try {
            // const response = await axios.post('서버', {
            //       id: id,
            //       password: password,
            // });
      
            // if (response.data.success) {
            //       console.log('로그인 성공');
            //       setLoginError('');
                  
            // } else {
            //       setLoginError('로그인 실패');
            // }
            // } catch (error) {
            //       console.error('로그인 오류 : ', error);
            //       setLoginError('로그인 실패');
            // }
      };

      //아이디랑 비밀번호 입력값을 지우는 함수
      const handleClearId = () => {
            setId('');
      };
      const handleClearPassword = () => {
            setPassword('');
      };
      

  return (
      <div className="container">
            {/* 타이틀 */}
            <div className="title"> 로그인</div>
            {/* 로그인 폼 */}
            <form onSubmit={handleLogin}>
                  {/* 아이디 input */}
                  <label>
                        <input 
                              type="text"  
                              placeholder="아이디" 
                              id="username"
                              value={id} 
                              onChange={(e) => setId(e.target.value)} 
                        />
                        {/* 아이디 클리어 버튼 */}
                        {id && <div type="button" className="btn_clear" onClick={handleClearId}>
                              <img className="btn_clear_img" alt="clear_icon" src="img/clear.png" />
                              </div>}
                  </label>
                  {/* 비밀번호 input */}
                  <label>
                        <input 
                              type="password" 
                              placeholder="비밀번호" 
                              id="password" 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)} 
                        />
                        {/* 비밀번호 클리어 버튼 */}
                        {password && <div type="button" className="btn_clear" onClick={handleClearPassword}>
                                          <img className="btn_clear_img" alt="clear_icon" src="img/clear.png" />
                                     </div>}
                  </label>
                  {/* 로그인에러메세지 */}
                  {loginError && <p className="error_message">{loginError}</p>}
                  {loginError === '' && <p className="error_message"> </p>}
                  {/* 로그인 버튼 */}
                  <button className="btn_login" type="submit">로그인</button>
                  <div className="txt_line"> 또는 </div>
                  {/* 소셜 로그인 버튼 */}
                  <div className="btn_col">
                        <button className="btn_naver">네이버 로그인</button>
                        <button className="btn_kakao">Kakao 로그인</button>
                        <button className="btn_Google">Google 로그인</button>
                  </div>
                  {/* 회원가입 링크 */}
                  <NavLink to="/Join">
                        <p className="link_join">회원가입</p>
                  </NavLink>             
            </form>
      </div>
  );
}

export default Login;