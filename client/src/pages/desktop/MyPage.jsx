import React, { useState, useEffect, useContext } from 'react';
import MyStatus from '../../components/desktop/MyStatus';
import MyPlaylist from '../../components/desktop/MyPlaylist';
import styled from 'styled-components';
import { ConfirmModal } from '../../components/desktop/ConfirmModal';
import { UserContext } from '../../App';

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

  @media screen and (max-width: 900px) {
    height: auto;
    margin: 80px 0;
  }
`;

const MyPage = () => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo.pending && !sessionStorage.getItem('modal')) {
      sessionStorage.setItem('modal', 'showed');
      setOpen(true);
    }
  }, []);

  return (
    <Container>
      {open ? (
        <ConfirmModal
          text="메일함의 인증 메일을 확인해주시기 바랍니다."
          handleModal={setOpen}
        />
      ) : (
        <></>
      )}
      <MyStatus />
      <MyPlaylist />
    </Container>
  );
};

export default MyPage;
