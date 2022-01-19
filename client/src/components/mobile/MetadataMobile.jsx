import { useContext, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { UserContext } from '../../App';

const MetadataContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 6fr 2fr;
`;

const GhostLeftDiv = styled.div``;

const MusicNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-style: normal;
  font-weight: bold;
  font-size: 2.9rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.5);
`;

const MusicName = styled.div`
  animation: ${({ text }) =>
    text > 15 ? 'slide 20s linear infinite' : 'none'};
  @keyframes slide {
    0% {
      transform: translatex(0%);
    }

    50% {
      transform: translatex(-100%);
    }

    100% {
      transform: translatex(0%);
    }
  }
`;

const MusicLength = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 2.7rem;
  color: rgba(0, 0, 0, 0.5);
`;

const AddButton = styled.button`
  align-self: center;
  border-radius: 50%;
  width: 10vw;
  height: 10vw;
  background: #f7f2ed;
  box-shadow: 0.5rem 0.5rem 0.3rem 0.3rem rgba(0, 0, 0, 0.12);
  border: none;
  color: #f04747;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 10vw;

  &:hover {
    background-color: lightgreen;
  }
`;

const musicTimeFormat = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const MetadataMobile = ({ currentMusic, currentPlaylist }) => {
  const {
    userInfo,
    musicList,
    playlist,
    setPlaylist,
    setMusicList,
    requestUserInfo,
  } = useContext(UserContext);

  const playlist_idx = useMemo(() => {
    return playlist.findIndex(
      (playlist) => playlist.playlist_id === currentPlaylist
    );
  }, [playlist, currentPlaylist]);

  const sendMusicList = (items = musicList) => {
    const endpoint = `https://final.eax.kr/api/playlists/${currentPlaylist}`;
    const token = localStorage.getItem('Token');
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const music_order = items.map(({ music_id }) => music_id);
    axios
      .put(endpoint, { music_order }, { headers })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        setMusicList(musicList);
        sessionStorage.setItem('musicList', JSON.stringify(musicList));
      });
  };

  const addToPlaylist = (e) => {
    if (!currentMusic['music_id']) {
      alert('먼저 음악을 선택해 주세요.');
      return;
    }
    if (!currentPlaylist) {
      alert('먼저 재생목록을 선택해 주세요.');
      return;
    }

    if (!userInfo) {
      const newMusicList = [...musicList];
      const newCurrentMusic = { ...currentMusic };
      newCurrentMusic.music_id = Math.floor(Math.random() * 1000000);
      newMusicList.push(newCurrentMusic);
      setMusicList(newMusicList);
      sessionStorage.setItem('musicList', JSON.stringify(newMusicList));

      if (playlist_idx === -1) return;
      const playlistLength = newMusicList.reduce(
        (acc, { music_time }) => acc + Number(music_time),
        0
      );
      const newPlaylist = [...playlist];
      newPlaylist[playlist_idx].playlist_time = playlistLength;
      setPlaylist(newPlaylist);
      return;
    }

    const endpoint = `https://final.eax.kr/api/playlists/${currentPlaylist}`;
    const token = localStorage.getItem('Token');
    const headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .post(endpoint, currentMusic, { headers })
      .then((res) => {
        const newMusicList = [...musicList];
        const newCurrentMusic = { ...currentMusic };
        newCurrentMusic.music_id = res.data.music_id;
        newMusicList.push(newCurrentMusic);
        setMusicList(newMusicList);
        sessionStorage.setItem('musicList', JSON.stringify(newMusicList));
        sendMusicList(newMusicList);

        if (playlist_idx === -1) return;
        const playlistLength = newMusicList.reduce(
          (acc, { music_time }) => acc + Number(music_time),
          0
        );
        const newPlaylist = [...playlist];
        newPlaylist[playlist_idx].playlist_time = playlistLength;
        setPlaylist(newPlaylist);
        return;
      })
      .catch((err) => {
        console.dir(err);
      });
    // console.dir(currentMusic);
    // console.dir(userInfo);
    // console.dir(currentPlaylist);
  };

  return (
    <MetadataContainer>
      <GhostLeftDiv />
      <MusicNameWrapper>
        <MusicName
          text={currentMusic['music_name'] ? currentMusic.music_name.length : 7}
        >
          {currentMusic['music_name'] ? currentMusic.music_name : 'loading'}
        </MusicName>
        <MusicLength>
          {currentMusic['music_time']
            ? musicTimeFormat(currentMusic.music_time)
            : '--:--'}
        </MusicLength>
      </MusicNameWrapper>
      <AddButton onClick={addToPlaylist}>+</AddButton>
    </MetadataContainer>
  );
};

export default MetadataMobile;
