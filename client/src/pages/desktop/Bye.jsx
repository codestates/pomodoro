import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer } from '../../styles/FormContainer.styled';
import { ReactComponent as Logo } from '../../images/logo.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  margin: 0 15px;
`;

const Text = styled.p`
  margin-top: 30px;
  font-size: 2.5rem;
  line-height: 1.5em;
`;

const Link = styled.div`
  margin-top: 30px;
  font-size: 1.5rem;
  cursor: pointer;

  :hover {
    color: #d66258;
  }
`;

const Bye = () => {
  const navigate = useNavigate();
  return (
    <FormContainer>
      <Wrapper>
        <Logo />
        <Text>
          탈퇴 처리가 성공적으로 완료되었습니다.
          <br />
          그동안 이용해주셔서 감사합니다.
        </Text>
        <Link onClick={() => navigate('/')}>홈으로 돌아가기</Link>
      </Wrapper>
    </FormContainer>
  );
};

export default Bye;
