import React from 'react';
import MyStatus from '../../components/desktop/MyStatus';
import MyPlaylist from '../../components/desktop/MyPlaylist';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #945151;
  user-select: none;
  padding: 50px 0 100px;

  @media screen and (max-width: 900px) {
    height: auto;
    margin: 80px 0;
  }
`;

const MyPage = () => {
  return (
    <Container>
      <MyStatus />
      <MyPlaylist />
    </Container>
  );
};

export default MyPage;
