import React from 'react';
import { FormContainer } from '../../styles/FormContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormInput } from '../../styles/FormInput.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { FormBtn } from '../../styles/FormBtn.styled';
import { ReactComponent as Logo } from '../../images/logo.svg';
import styled from 'styled-components';

const Text = styled.span`
  width: 90%;
  text-align: end;
  font-size: 1.3rem;
  cursor: pointer;

  &:hover {
    color: #d66258;
  }
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
  return (
    <FormContainer>
      <Form>
        <Logo />
        <FormWrapper marginTop="40px" marginBottom="30px">
          <FormInput type="text" placeholder="이메일" />
        </FormWrapper>
        <FormWrapper marginBottom="30px">
          <FormInput type="password" placeholder="비밀번호" />
        </FormWrapper>
        <FormWrapper>
          <Text>비밀번호를 잊으셨나요?</Text>
        </FormWrapper>
        <FormBtn>로그인</FormBtn>
        <Wrapper>
          <li>아직 회원이 아니세요?</li>
          <li>회원 가입</li>
        </Wrapper>
      </Form>
    </FormContainer>
  );
};

export default Login;
