import React from 'react';
import MyStatus from '../../components/desktop/MyStatus';
import MyPlaylist from '../../components/desktop/MyPlaylist';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #945151;
  user-select: none;
  z-index: 100;

  @media screen and (max-width: 900px) {
    height: auto;
    margin-top: 100px;
    margin-bottom: 100px;
  }
`;

const MyPage = ({ userInfo, playlist, setPlaylist }) => {
  return (
    <Container>
      <MyStatus userInfo={userInfo} />
      <MyPlaylist playlist={playlist} setPlaylist={setPlaylist} />
    </Container>
  );
};

export default MyPage;
