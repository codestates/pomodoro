import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer } from '../../styles/FormContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormInput } from '../../styles/FormInput.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { FormBtn } from '../../styles/FormBtn.styled';
import { FormErrorMsg } from '../../styles/FormErrorMsg.styled';
import { ReactComponent as Logo } from '../../images/logo.svg';
import axios from 'axios';
import {
  isValidNickname,
  isValidEmail,
  isValidPassword,
} from '../../validation/validation';

const SignUp = () => {
  const navigate = useNavigate();
  const [showErrMsg, setShowErrMsg] = useState({
    nickname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [errMsg, setErrMsg] = useState({
    nickname: '닉네임이 너무 길습니다.',
    email: '올바른 이메일 형식이 아닙니다.',
  });
  const nicknameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    nicknameRef.current.focus();
  }, []);

  const duplicateNickname = async () => {
    const nickname = nicknameRef.current.value;

    let result;
    try {
      result = await axios.get(
        `https://final.eax.kr/api/nicknames/${nickname}`
      );
    } catch (error) {
      setShowErrMsg({ ...showErrMsg, nickname: true });
      setErrMsg({ ...errMsg, nickname: '이미 사용 중인 닉네임입니다.' });
    }
  };

  const handleNicknameInput = () => {
    const nickname = nicknameRef.current.value;
    if (nickname === '') return;
    if (!isValidNickname(nickname)) {
      return setShowErrMsg({ ...showErrMsg, nickname: true });
    }
    duplicateNickname();
    setShowErrMsg({ ...showErrMsg, nickname: false });
  };

  const duplicateEmail = async () => {
    const email = emailRef.current.value;
    let result;
    try {
      result = await axios.get(`https://final.eax.kr/api/mails/${email}`);
    } catch (error) {
      setShowErrMsg({ ...showErrMsg, email: true });
      setErrMsg({ ...errMsg, email: '이미 사용 중인 이메일입니다.' });
    }
  };

  const handleEmailInput = () => {
    const email = emailRef.current.value;
    if (email === '') return;
    if (!isValidEmail(email)) {
      return setShowErrMsg({ ...showErrMsg, email: true });
    }
    duplicateEmail();
    setShowErrMsg({ ...showErrMsg, email: false });
  };

  const handlePasswordInput = () => {
    const password = passwordRef.current.value;
    if (password === '') return;
    const isValid = isValidPassword(password);
    if (!isValid) {
      setShowErrMsg({ ...showErrMsg, password: true });
    } else {
      setShowErrMsg({ ...showErrMsg, password: false });
    }
  };

  const isMatchPassword = () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      setShowErrMsg({ ...showErrMsg, confirmPassword: true });
      return false;
    } else {
      setShowErrMsg({ ...showErrMsg, confirmPassword: false });
      return true;
    }
  };

  const handleSignUpBtn = async () => {
    const { nickname, email, password, confirmPassword } = showErrMsg;
    const nicknameVal = nicknameRef.current.value;
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;
    const confirmPasswordVal = confirmPasswordRef.current.value;

    if (isMatchPassword()) {
      console.log(showErrMsg);
      if (nickname || email || password || confirmPassword) return;
      if (!nicknameVal || !emailVal || !passwordVal || !confirmPasswordVal)
        return;
    }

    let result;
    try {
      result = await axios.post(
        'https://final.eax.kr/api/users',
        {
          nickname: nicknameVal,
          email: emailVal,
          password: passwordVal,
        }
      );
    } catch (error) {
      return;
    }

    if (result) {
      navigate('/login');
    }
  };

  return (
    <FormContainer>
      <Form>
        <Logo />
        <FormWrapper marginTop="40px">
          <FormInput
            type="text"
            ref={nicknameRef}
            placeholder="닉네임"
            onBlur={handleNicknameInput}
          />
          <FormErrorMsg show={showErrMsg.nickname}>
            {errMsg.nickname}
          </FormErrorMsg>
        </FormWrapper>
        <FormWrapper>
          <FormInput
            type="email"
            ref={emailRef}
            placeholder="이메일"
            onBlur={handleEmailInput}
          />
          <FormErrorMsg show={showErrMsg.email}>{errMsg.email}</FormErrorMsg>
        </FormWrapper>
        <FormWrapper>
          <FormInput
            type="password"
            ref={passwordRef}
            placeholder="비밀번호"
            onBlur={handlePasswordInput}
          />
          <FormErrorMsg show={showErrMsg.password}>
            비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두
            포함해야 합니다.
          </FormErrorMsg>
        </FormWrapper>
        <FormWrapper>
          <FormInput
            type="password"
            ref={confirmPasswordRef}
            placeholder="비밀번호 재입력"
          />
          <FormErrorMsg show={showErrMsg.confirmPassword}>
            비밀번호가 일치하지 않습니다.
          </FormErrorMsg>
        </FormWrapper>
        <FormBtn onClick={handleSignUpBtn}>가입하기</FormBtn>
      </Form>
    </FormContainer>
  );
};

export default SignUp;
