import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer } from '../../styles/FormContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormInput } from '../../styles/FormInput.styled';
import { FormErrorMsg } from '../../styles/FormErrorMsg.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { FormBtn } from '../../styles/FormBtn.styled';
import { ReactComponent as Icon } from '../../images/tomato.svg';
import styled from 'styled-components';
import { FormText } from '../../styles/FormText.styled';
import { isValidEmail } from '../../validation/validation';
import { ConfirmModal } from '../../components/desktop/ConfirmModal';
import axios from 'axios';

require('dotenv').config();
const SERVER_ENDPOINT =
  process.env.REACT_APP_ENDPOINT || 'https://final.eax.kr';

const StyledIcon = styled.div`
  margin-bottom: 30px;
`;

const Header = styled.h1`
  font-size: 2rem;
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleEmailInput = () => {
    const email = emailRef.current.value;
    if (!isValidEmail(email)) {
      setShowErrMsg(true);
    } else {
      setShowErrMsg(false);
    }
  };

  const handleClickEnter = (e) => {
    if (e.key === 'Enter') {
      handleBtn();
    }
  };

  const handleBtn = async () => {
    const email = emailRef.current.value;

    if (email === '' || showErrMsg) return;

    await axios
      .post(`${SERVER_ENDPOINT}/api/passwords`, {
        email,
      })
      .then((res) => {
        setOpen(true);
        setEmail(email);
      });
    emailRef.current.value = '';
  };

  return (
    <FormContainer>
      {open ? (
        <ConfirmModal
          text={`${email}에 메일을 발송했습니다.`}
          handleModal={setOpen}
        />
      ) : (
        <></>
      )}
      <Form>
        <StyledIcon>
          <Icon width="80px" />
        </StyledIcon>
        <Header>비밀번호를 잊으셨나요?</Header>
        <FormWrapper marginTop="40px" marginBottom="30px">
          <FormInput
            type="email"
            placeholder="이메일"
            ref={emailRef}
            onFocus={handleEmailInput}
            onChange={handleEmailInput}
            onKeyDown={handleClickEnter}
          />
          <FormErrorMsg show={showErrMsg}>
            올바른 이메일 형식이 아닙니다.
          </FormErrorMsg>
        </FormWrapper>
        <FormBtn onClick={handleBtn}>비밀번호 재설정</FormBtn>
        <FormText onClick={() => navigate('/login')}>
          로그인 페이지로 가기
        </FormText>
      </Form>
    </FormContainer>
  );
};

export default ForgotPassword;
