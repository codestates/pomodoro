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

const StyledLogo = styled.div`
  width: 100%;
  cursor: pointer;
`;

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
  const [errMsg, setErrMsg] = useState('');
  const nicknameRef = useRef(null);
  const pwRef = useRef(null);

  useEffect(() => {
    nicknameRef.current.focus();
  }, []);

  const handleLoginBtn = async () => {
    const nickname = nicknameRef.current.value;
    const password = pwRef.current.value;
    if (nickname === '' || password === '') {
      setShowErrMsg(true);
      setErrMsg('닉네임과 비밀번호를 입력해주세요.');
      return;
    }

    await axios
      .post('https://final.eax.kr/api/auth', {
        nickname,
        password,
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('Token', token);
        navigate('/');
      })
      .catch((error) => {
        setShowErrMsg(true);
        setErrMsg('닉네임과 비밀번호가 일치하지 않습니다.');
      });
  };

  return (
    <FormContainer>
      <Form>
        <StyledLogo onClick={() => navigate('/')} title="홈으로 가기">
          <Logo />
        </StyledLogo>
        <FormWrapper marginTop="40px" marginBottom="30px">
          <FormInput type="text" ref={nicknameRef} placeholder="닉네임" />
        </FormWrapper>
        <FormWrapper>
          <FormInput type="password" ref={pwRef} placeholder="비밀번호" />
        </FormWrapper>
        <FormErrorMsg show={showErrMsg}>{errMsg}</FormErrorMsg>
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
