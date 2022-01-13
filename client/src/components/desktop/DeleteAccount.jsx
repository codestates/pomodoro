import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Icon } from '../../images/tomato.svg';
import { ModalContainer } from '../../styles/ModalContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { FormInput } from '../../styles/FormInput.styled';
import { FormErrorMsg } from '../../styles/FormErrorMsg.styled';
import styled from 'styled-components';
import axios from 'axios';

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
  width: 90%;
  font-size: 1.8rem;
  line-height: 1.5em;
  margin-bottom: 30px;
  text-align: center;
  user-select: none;
`;

const ButtonWrapper = styled.div`
  width: 80%;
  text-align: end;
`;

const Button = styled.button`
  border: none;
  background-color: #ea5248;
  color: white;
  border-radius: 5px;
  text-align: end;
  font-size: 1.5rem;
  padding: 0.4em 0.7em;
  margin-top: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

export const DeleteAccount = ({ setOpen }) => {
  const navigate = useNavigate();
  const [showErrMsg, setShowErrMsg] = useState(false);
  const passwordRef = useRef(null);

  const handleClickContainer = (e) => {
    if (e.target.id === 'container') {
      setOpen(false);
    }
  };

  const handleDeleteBtn = async () => {
    await axios
      .delete('https://final.eax.kr/api/users', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('Token')}`,
          'X-password': passwordRef.current.value,
        },
      })
      .then((res) => {
        navigate('/delete');
        localStorage.clear();
      })
      .catch((error) => {
        setShowErrMsg(true);
      });
  };
  return (
    <ModalContainer id="container" onClick={handleClickContainer}>
      <Form width="430px">
        <StyledIcon>
          <Icon width="80px" />
        </StyledIcon>
        <Header>
          탈퇴하면 회원 정보를 복구할 수 없습니다.
          <br />
          정말 탈퇴하시겠습니까?
        </Header>
        <FormWrapper>
          <FormInput
            type="password"
            placeholder="비밀번호"
            ref={passwordRef}
            width="80%"
          />
          <FormErrorMsg width="80%" show={showErrMsg}>
            비밀번호가 틀렸습니다.
          </FormErrorMsg>
        </FormWrapper>
        <ButtonWrapper>
          <Button onClick={handleDeleteBtn}>탈퇴하기</Button>
        </ButtonWrapper>
      </Form>
    </ModalContainer>
  );
};
