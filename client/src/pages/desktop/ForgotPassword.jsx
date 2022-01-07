import React from 'react';
import { FormContainer } from '../../styles/FormContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormInput } from '../../styles/FormInput.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { FormBtn } from '../../styles/FormBtn.styled';
import { ReactComponent as Icon } from '../../images/tomato.svg';
import styled from 'styled-components';
import { FormText } from '../../styles/FormText.styled';

const StyledIcon = styled.div`
  margin-bottom: 30px;
`;

const Header = styled.h1`
  font-size: 2rem;
`;

const ForgotPassword = () => {
  return (
    <FormContainer>
      <Form>
        <StyledIcon>
          <Icon width="80px" />
        </StyledIcon>
        <Header>비밀번호를 잊으셨나요?</Header>
        <FormWrapper marginTop="40px" marginBottom="30px">
          <FormInput type="email" placeholder="이메일" />
        </FormWrapper>
        <FormBtn>비밀번호 재설정</FormBtn>
        <FormText>로그인 페이지로 가기</FormText>
      </Form>
    </FormContainer>
  );
};

export default ForgotPassword;
