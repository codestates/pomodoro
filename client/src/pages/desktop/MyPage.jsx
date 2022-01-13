import React from 'react';
import MyStatus from '../../components/desktop/MyStatus';
import MyPlaylist from '../../components/desktop/MyPlaylist';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #945151;
  user-select: none;
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
