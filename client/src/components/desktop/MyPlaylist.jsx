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

const MyPlaylist = ({ playlist, setPlaylist }) => {
  return (
    <Container>
      <Title>내 플레이리스트</Title>
      <Playlists>
        {playlist.map((item, index) => (
          <Playlist
            id={item.playlist_id}
            index={index}
            key={item.playlist_id}
            order={index + 1}
            name={item.playlist_name}
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
        ))}
      </Playlists>
    </Container>
  );
};

export default MyPlaylist;
