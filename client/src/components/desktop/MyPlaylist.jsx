import React, { useContext } from 'react';
import { SectionContainer } from '../../styles/SectionContainer';
import Playlist from '../../components/desktop/Playlist';
import styled from 'styled-components';
import { UserContext } from '../../App';

const Container = styled(SectionContainer)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
  height: 350px;
  padding: 2em;
  font-size: 1.8rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    margin-bottom: 50px;
    height: auto;
  }
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

const Text = styled.div`
  color: gray;
  margin: auto;
  text-align: center;
`;

const MyPlaylist = () => {
  const { playlist } = useContext(UserContext);
  return (
    <Container>
      <Title>내 플레이리스트</Title>
      {playlist.length !== 0 ? (
        <Playlists>
          {playlist.map((item, index) => (
            <Playlist
              id={item.playlist_id}
              index={index}
              key={item.playlist_id}
              order={index + 1}
              name={item.playlist_name}
            />
          ))}
        </Playlists>
      ) : (
        <Playlists>
          <Text>플레이리스트가 비어 있습니다.</Text>
        </Playlists>
      )}
    </Container>
  );
};

export default MyPlaylist;
