import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../App';

const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  height: 45px;
  padding: 10px 20px;
  font-size: 1.8rem;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: #f2e7da;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const RanknName = styled.li`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Rank = styled.div`
  color: #c16b3f;
  font-weight: bold;
  margin-left: 10px;
`;

const Name = styled.div`
  margin-left: 43px;
`;

const Score = styled.div`
  margin-right: 13px;
`;

const MyRank = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <Container>
      <RanknName>
        <Rank>{userInfo.rank}</Rank>
        <Name>{userInfo.nickname}</Name>
      </RanknName>
      <Score>{userInfo.pomo}&nbsp;뽀모</Score>
    </Container>
  );
};

export default MyRank;
