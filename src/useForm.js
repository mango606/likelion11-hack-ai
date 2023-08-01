// useForm.js
import { useState } from 'react';

export default function useForm() {
  const [Id, setId] = useState('');
  const [IdError, setIdError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  const validatePassword = (password) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
	return re.test(password);
  }

  const validateEmail = (email) => {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(email);
  }

  const validateId = (id) => {
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

  const handlePasswordSame = (event) => {
    const newPass = event.target.value;

    if (newPass !== password) {
      setPasswordCheckError(true);
    } else {
      setPasswordCheckError(false);
    }

    setPasswordCheck(newPass);
  }

  return {
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
  }
}
