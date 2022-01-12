import React from 'react';
import { ReactComponent as Icon } from '../../images/tomato.svg';
import { ModalContainer } from '../../styles/ModalContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { FormInput } from '../../styles/FormInput.styled';
import styled from 'styled-components';

const StyledIcon = styled.div`
  margin-bottom: 30px;
  svg .st0,
  svg .st1 {
    animation: fadeout 2000ms ease-in;
    animation-iteration-count: infinite;
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

const Header = styled.h1`
  width: 80%;
  font-size: 2rem;
  margin-bottom: 30px;
  user-select: none;
`;

const ButtonWrapper = styled.div`
  width: 90%;
  text-align: end;
`;

const Button = styled.button`
  border: none;
  background-color: #ea5248;
  color: white;
  border-radius: 5px;
  text-align: end;
  font-size: 1.8rem;
  padding: 0.4em 0.7em;
  margin-top: 10px;
`;

export const DeleteAccount = ({ setOpen }) => {
  const handleClickContainer = (e) => {
    if (e.target.id === 'container') {
      setOpen(false);
    }
  };

  const handleDeleteBtn = () => {
    // 탈퇴
  };
  return (
    <ModalContainer id="container" onClick={handleClickContainer}>
      <Form>
        <StyledIcon>
          <Icon width="80px" />
        </StyledIcon>
        <Header>
          탈퇴하면 회원 정보를 복구할 수 없습니다.
          <br />
          정말 탈퇴하시겠습니까?
        </Header>
        <FormWrapper>
          <FormInput type="password" placeholder="비밀번호" />
        </FormWrapper>
        <ButtonWrapper>
          <Button onClick={handleDeleteBtn}>탈퇴하기</Button>
        </ButtonWrapper>
      </Form>
    </ModalContainer>
  );
};
