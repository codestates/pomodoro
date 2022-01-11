import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer } from '../../styles/FormContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormInput } from '../../styles/FormInput.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { FormBtn } from '../../styles/FormBtn.styled';
import { FormText } from '../../styles/FormText.styled';
import { FormErrorMsg } from '../../styles/FormErrorMsg.styled';
import { ReactComponent as Logo } from '../../images/logo.svg';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.ul`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  user-select: none;

  li:last-child:hover {
    cursor: pointer;
    color: #d66258;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [showErrMsg, setShowErrMsg] = useState(false);
  const emailRef = useRef(null);
  const pwRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLoginBtn = async () => {
    let result;
    try {
      result = await axios.post(
        'https://final.eax.kr/api/auth',
        {
          nickname: emailRef.current.value,
          password: pwRef.current.value,
        },
        { withCredentials: true }
      );
    } catch (error) {
      setShowErrMsg(true);
    }
    if (result) {
      navigate('/');
    }
  };

  return (
    <FormContainer>
      <Form>
        <Logo onClick={() => navigate('/')} />
        <FormWrapper marginTop="40px" marginBottom="30px">
          <FormInput type="email" ref={emailRef} placeholder="이메일" />
        </FormWrapper>
        <FormWrapper>
          <FormInput type="password" ref={pwRef} placeholder="비밀번호" />
        </FormWrapper>
        <FormErrorMsg show={showErrMsg}>
          이메일과 비밀번호가 일치하지 않습니다.
        </FormErrorMsg>
        <FormWrapper>
          <FormText onClick={() => navigate('/forgotpw')}>
            비밀번호를 잊으셨나요?
          </FormText>
        </FormWrapper>
        <FormBtn onClick={handleLoginBtn}>로그인</FormBtn>
        <Wrapper>
          <li>아직 회원이 아니세요?</li>
          <li onClick={() => navigate('/signup')}>회원 가입</li>
        </Wrapper>
      </Form>
    </FormContainer>
  );
};

export default Login;
