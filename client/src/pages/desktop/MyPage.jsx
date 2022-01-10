import React from 'react';
import MyStatus from '../../components/desktop/MyStatus';
import MyPlaylist from '../../components/desktop/MyPlaylist';
import Header from '../../components/desktop/Header';
import Footer from '../../components/desktop/Footer';
import styled from 'styled-components';

const userInfo = {
  nickname: '포모',
  email: 'ggdsgg@gmail.com',
  rank: 100,
  pomo: 1,
};

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

const MyPage = () => {
  return (
    <>
      <Header />
      <Container>
        <MyStatus userInfo={userInfo} />
        <MyPlaylist />
      </Container>
      <Footer />
    </>
  );
};

export default MyPage;
