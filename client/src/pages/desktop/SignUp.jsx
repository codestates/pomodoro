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
  isOnlySpace,
  isValidNickname,
  isValidEmail,
  isValidPassword,
} from '../../validation/validation';
import styled from 'styled-components';

const SERVER_ENDPOINT =
  process.env.REACT_APP_ENDPOINT || window.location.origin;

const StyledLogo = styled.div`
  width: 100%;
  cursor: pointer;
`;

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

    await axios
      .get(`${SERVER_ENDPOINT}/api/nicknames/${nickname}`)
      .then((res) => {
        return;
      })
      .catch((error) => {
        setShowErrMsg({ ...showErrMsg, nickname: true });
        setErrMsg({
          ...errMsg,
          nickname:
            '이미 사용 중인 닉네임이거나 사용할 수 없는 문자가 포함되어 있습니다.',
        });
      });
  };

  const handleNicknameInput = () => {
    const nickname = nicknameRef.current.value;
    if (nickname === '') return;
    if (isOnlySpace(nickname)) {
      setErrMsg({
        ...errMsg,
        nickname: '여백만으로 닉네임을 만들 수 없습니다.',
      });
      return setShowErrMsg({ ...showErrMsg, nickname: true });
    }

    if (!isValidNickname(nickname)) {
      return setShowErrMsg({ ...showErrMsg, nickname: true });
    }
    duplicateNickname();
    setShowErrMsg({ ...showErrMsg, nickname: false });
  };

  const duplicateEmail = async () => {
    const email = emailRef.current.value;

    await axios
      .get(`${SERVER_ENDPOINT}/api/mails/${email}`)
      .then((res) => {
        return;
      })
      .catch((error) => {
        setShowErrMsg({ ...showErrMsg, email: true });
        setErrMsg({ ...errMsg, email: '이미 사용 중인 이메일입니다.' });
      });
  };

  const handleEmailInput = () => {
    const email = emailRef.current.value;
    if (isOnlySpace(email)) {
      return setShowErrMsg({ ...showErrMsg, email: true });
    }
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
    } else {
      setShowErrMsg({ ...showErrMsg, confirmPassword: false });
    }
  };

  const sendAuthMail = async (token) => {
    await axios.post(
      `${SERVER_ENDPOINT}/api/mails`,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  };

  const handleClickEnter = (e) => {
    if (e.key === 'Enter') {
      handleSignUpBtn();
    }
  };

  const handleSignUpBtn = async () => {
    const nickname = nicknameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (
      showErrMsg.nickname ||
      showErrMsg.email ||
      showErrMsg.password ||
      showErrMsg.confirmPassword
    )
      return;

    await axios
      .post(`${SERVER_ENDPOINT}/api/users`, {
        nickname,
        email,
        password,
      })
      .then((res) => {
        const token = res.data.token;
        sendAuthMail(token);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormContainer>
      <Form>
        <StyledLogo onClick={() => navigate('/')} title="홈으로 가기">
          <Logo />
        </StyledLogo>
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
            onFocus={isMatchPassword}
            onChange={isMatchPassword}
            onKeyDown={handleClickEnter}
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
