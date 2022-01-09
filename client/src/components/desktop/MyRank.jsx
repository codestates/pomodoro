import React from 'react';
import styled from 'styled-components';

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
`;

const MyRank = ({ rank, nickname, pomo }) => {
  return (
    <Container>
      <RanknName>
        <Rank>{rank}</Rank>
        <div>{nickname}</div>
      </RanknName>
      <div>{pomo}&nbsp;뽀모</div>
    </Container>
  );
};

export default MyRank;
