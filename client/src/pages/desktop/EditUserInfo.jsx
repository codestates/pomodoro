import React from 'react';
import { FormContainer } from '../../styles/FormContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormInput } from '../../styles/FormInput.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { ReactComponent as Icon } from '../../images/tomato.svg';
import styled from 'styled-components';
import { FormErrorMsg } from '../../styles/FormErrorMsg.styled';

const StyledIcon = styled.div`
  margin-bottom: 30px;
`;

const Header = styled.h1`
  font-size: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const Button = styled.button`
  border: none;
  background-color: #ea5248;
  color: white;
  border-radius: 5px;
  text-align: center;
  padding: 0.5em 1.5em;
  font-size: 1.5em;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  &:active {
    transform: scale(0.9);
    transition-duration: 250ms;
  }
`;

const EditUserInfo = () => {
  return (
    <FormContainer>
      <Form>
        <StyledIcon>
          <Icon width="80px" />
        </StyledIcon>
        <Header>비밀번호를 변경하시겠습니까?</Header>
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
        <Buttons>
          <Button>변경하기</Button>
          <Button>회원탈퇴</Button>
        </Buttons>
      </Form>
    </FormContainer>
  );
};

export default EditUserInfo;
