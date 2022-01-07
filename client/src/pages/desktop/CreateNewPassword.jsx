import React from 'react';
import { FormContainer } from '../../styles/FormContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormInput } from '../../styles/FormInput.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { FormBtn } from '../../styles/FormBtn.styled';
import { ReactComponent as Icon } from '../../images/tomato.svg';
import styled from 'styled-components';
import { FormErrorMsg } from '../../styles/FormErrorMsg.styled';

const StyledIcon = styled.div`
  margin-bottom: 30px;
`;

const Header = styled.h1`
  font-size: 2rem;
`;

const CreateNewPassword = () => {
  return (
    <FormContainer>
      <Form>
        <StyledIcon>
          <Icon width="80px" />
        </StyledIcon>
        <Header>새 비밀번호를 입력해주세요</Header>
        <FormWrapper marginTop="40px">
          <FormInput type="password" placeholder="비밀번호" />
          <FormErrorMsg>
            8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야
            합니다.
          </FormErrorMsg>
        </FormWrapper>
        <FormWrapper>
          <FormInput type="password" placeholder="비밀번호 재입력" />
          <FormErrorMsg>비밀번호가 일치하지 않습니다.</FormErrorMsg>
        </FormWrapper>
        <FormBtn>비밀번호 변경</FormBtn>
      </Form>
    </FormContainer>
  );
};

export default CreateNewPassword;
