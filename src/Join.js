// Join.js
import React, { useState } from 'react';

const Join = () => {
  const [Id, setId] = useState('');
  const [IdError, setIdError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const validatePassword = (password) => {
	// 비밀번호가 8자리 이상이며 숫자, 대소문자 알파벳, 특수문자 중 하나를 최소한 포함하는지 확인
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
	return re.test(password);
  }

  const validateEmail = (email) => {
	// 이메일 형식인지 확인
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
	}

  const validateId = (id) => {
    // 아이디가 5~15자리인지 확인
    const re = /^[a-zA-Z\d]{5,15}$/;
    return re.test(id);
  }

  const handleIdChange = (event) => {
    const newName = event.target.value;

    if (!validateId(newName)) {
      setIdError(true);
    } else {
      setIdError(false);
    }

    setId(newName);
  }

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;

    if (!validateEmail(newEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    setEmail(newEmail);
  }

  const handlePasswordChange = (event) => {
    const newPass = event.target.value;

    if (!validatePassword(newPass)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    setPassword(newPass);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`id: ${Id}, Email: ${email}, Password: ${password}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원 가입</h2>

      <label>
        아이디 :
        <input type="text" value={Id} onChange={handleIdChange} />
        {IdError && <p>아이디는 5~15자리의 영문 대소문자와 숫자로만 입력해주세요.</p>}
      </label>

      <label>
        이메일 :
        <input type="email" value={email} onChange={handleEmailChange} />
        {emailError && <p>이메일 형식이 올바르지 않습니다.</p>}
      </label>

      <label>
        비밀번호 :
        <input type="password" value={password} onChange={handlePasswordChange} />
        {passwordError && <p>비밀번호는 8자리 이상이며 숫자, 대소문자 알파벳을 포함해야 합니다.</p>}
      </label>

      <button type="submit" disabled={passwordError || emailError || IdError}>회원 가입</button>

    </form>
  );
};

export default Join;
