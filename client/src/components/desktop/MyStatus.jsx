import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Medal } from '../../images/medal.svg';
import { SectionContainer } from '../../styles/SectionContainer';

const UserDatas = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 3;
  font-size: 1.8rem;
`;

const UserData = styled.li`
  margin-bottom: 10px;
`;

const Button = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 1.5rem;
  padding: 0.5em 1.5em;
  background-color: #f2e7da;
  border: none;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  transition: all 250ms ease-in;

  &:hover {
    transform: scale(0.9);
  }

  @media screen and (max-width: 900px) {
    position: relative;
    top: 0;
    right: 0;
    margin: 10px 0 20px;
  }
`;

const StyledMedal = styled.div`
  text-align: center;
  flex: 1;
`;

const MyStatus = ({ userInfo }) => {
  const navigate = useNavigate();
  const { nickname, email, rank, pomo } = userInfo;
  return (
    <SectionContainer>
      <StyledMedal>
        <Medal width="110px" />
      </StyledMedal>
      <UserDatas>
        <UserData>
          <strong>닉네임:&nbsp;</strong>
          {nickname}
        </UserData>
        <UserData>
          <strong>이메일:&nbsp;</strong>
          {email}
        </UserData>
        <UserData>
          <strong>순위:&nbsp;</strong>
          {rank}
        </UserData>
        <UserData>
          <strong>뽀모:&nbsp;</strong>
          {pomo}
        </UserData>
      </UserDatas>
      <Button type="button" onClick={() => navigate('/editinfo')}>
        정보 수정
      </Button>
    </SectionContainer>
  );
};

export default MyStatus;
