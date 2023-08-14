// useForm.js
import { useState } from 'react';

export default function useForm() {
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [Id, setId] = useState('');
  const [IdError, setIdError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [Nickname, setNickname] = useState('');
  const [NicknameError, setNicknameError] = useState(false);
  const [Birth, setBirth] = useState('');
  const [BirthError, setBirthError] = useState(false);
  const [interest, setInterest] = useState('없음');


  const handleIdDuplication = async (event) => {
    event.preventDefault();
    if (IdError) {
      return;
    }
  

  if (Id === 'testt') {
    setIsDuplicated('duplicate');
    console.log(isDuplicated);
  } else {

    setIsDuplicated(true); // 임시
  }
}

  const handleInterestChange = (event) => {
    setInterest(event.target.value);
  }

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
    setIsDuplicated(false);
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

  const handleNicknameChange = (event) => {
    const newNickname = event.target.value;

    if (newNickname.length < 2 || newNickname.length > 10) {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
    setNickname(newNickname);
  }

  const validateBirth = (birth) => {
    let flag = false;
    let year;
    let month;
    let day;
    if (birth.includes('.')) {
      year = birth.slice(0, 4);
      month = birth.slice(5, 7);
      day = birth.slice(8, 10);
      flag = /^\d{4}$/.test(year) && /^\d{2}$/.test(month) && /^\d{2}$/.test(day);
    } else {
      year = birth.slice(0, 4);
      month = birth.slice(4, 6);
      day = birth.slice(6, 8);
      flag = /^\d{8}$/.test(birth);
    }
    if (parseInt(month) > 12 || parseInt(month) < 1) {
      flag = false;
    }
    if (parseInt(day) > 31 || parseInt(day) < 1) {
      flag = false;
    }
    if (parseInt(month) === 2 && parseInt(day) > 29) {
      flag = false;
    }
    if (parseInt(month) === 4 && parseInt(day) > 30) {
      flag = false;
    }
    if (parseInt(month) === 6 && parseInt(day) > 30) {
      flag = false;
    }
    if (parseInt(month) === 9 && parseInt(day) > 30) {
      flag = false;
    }
    if (parseInt(month) === 11 && parseInt(day) > 30) {
      flag = false;
    }
    if (parseInt(year) % 4 !== 0 && parseInt(month) === 2 && parseInt(day) > 28) {
      flag = false;
    }
    if (parseInt(year) % 100 === 0 && parseInt(year) % 400 !== 0 && parseInt(month) === 2 && parseInt(day) > 28) {
      flag = false;
    }
    if (parseInt(year) < 1900 || parseInt(year) > new Date().getFullYear()) {
      flag = false;
    }
    if (new Date(year, month - 1, day) > new Date()) {
      flag = false;
    }
    return flag;
  }

  const handleBirthChange = (event) => {
    const newBirth = event.target.value;

    if (!validateBirth(newBirth)) {
      setBirthError(true);
    } else {
      setBirthError(false);
    }
    if (newBirth.length === 8 && !newBirth.includes('.') && !isNaN(newBirth)) {
      setBirth(`${newBirth.slice(0, 4)}.${newBirth.slice(4, 6)}.${newBirth.slice(6, 8)}`);
    } else if (newBirth.length <= 10) {
      setBirth(newBirth);
    }
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
    handlePasswordSame,
    Nickname,
    NicknameError,
    Birth,
    BirthError,
    handleNicknameChange,
    handleBirthChange,
    interest,
    handleInterestChange,
    isDuplicated,
    handleIdDuplication
  }
}
