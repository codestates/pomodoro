import React from 'react';
import { SectionContainer } from '../../styles/SectionContainer';
import Playlist from '../../components/desktop/Playlist';
import styled from 'styled-components';

const Container = styled(SectionContainer)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
  height: 350px;
  padding: 2em;
  font-size: 1.5rem;
`;

const Playlists = styled.ol`
  width: 100%;
  overflow-y: scroll;
`;

const Title = styled.h3`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
`;

const MyPlaylist = ({ playlists }) => {
  return (
    <Container>
      <Title>내 플레이리스트</Title>
      <Playlists>
        {playlists.map((item) => (
          <Playlist
            key={item.playlist_id}
            order={item.playlist_id}
            name={item.playlist_name}
          />
        ))}
      </Playlists>
    </Container>
  );
};

export default MyPlaylist;
