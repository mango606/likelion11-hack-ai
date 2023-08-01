// Join.js
import React from 'react';
import './Join.css';
import useForm from './useForm';

const Join = () => {
  const {
    Id,
    IdError,
    email,
    emailError,
    password,
    passwordError,
    passwordCheck,
    passwordCheckError,
    handleIdChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordSame
    } = useForm();


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`id: ${Id}, Email: ${email}, Password: ${password}`);
  }

  return (
  <div className="joinForm">
    <form onSubmit={handleSubmit}>
      <h2>회원 가입</h2>

      <div>
        아이디 :
        <input type="text" value={Id} onChange={handleIdChange} />
        <p className={IdError ? 'errorMessage' : 'invisibleText'}>
        {IdError ? '아이디는 5~15자리의 영문 대소문자와 숫자로만 입력해주세요.' : 'invisible text'}
        </p>
      </div>

      <div>
        이메일 :
        <input type="email" value={email} onChange={handleEmailChange} />
        <p className={emailError ? 'errorMessage' : 'invisibleText'}>
        {emailError ? '이메일 형식이 잘못되었습니다.' : 'invisible text'}
        </p>
      </div>

      <div>
        비밀번호 :
        <input type="password" value={password} onChange={handlePasswordChange} />
        <p className={passwordError ? 'errorMessage' : 'invisibleText'}>
        {passwordError ? '비밀번호는 8자리 이상이며 숫자, 대소문자 알파벳을 포함해야 합니다.' : 'invisible text'}
        </p>
      </div>

      <div>
        비밀번호 확인 :
        <input type="password" value={passwordCheck} onChange={handlePasswordSame} />
        <p className={(!passwordError && passwordCheckError) ? 'errorMessage' : 'invisibleText'}>
        {(!passwordError && passwordCheckError) ? '비밀번호가 다릅니다.' : 'invisible text'}
        </p>
      </div>

      <button type="submit" disabled={passwordError || emailError || IdError || passwordCheckError}>회원 가입</button>

    </form>
  </div>
  );
};

export default Join;
