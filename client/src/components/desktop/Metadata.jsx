import { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ConfirmModal } from '../../components/desktop/ConfirmModal';
import { ReactComponent as PlayIcon } from '../../images/TomatoPlay.svg';
import { UserContext } from '../../App';
import axios from 'axios';

const MetadataContainer = styled.div`
  margin: 2rem auto 0 auto;
  max-width: 119.5rem;
`;

const MetadataWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const GhostLeftDiv = styled.div`
  flex: 388 388 auto;
  max-width: 38.8rem;
  min-width: 38.8rem;
`;

const MusicNameWrapper = styled.div`
  flex: 279 279 auto;
  max-width: 27.9rem;
  font-style: normal;
  font-weight: bold;
  font-size: 2.9rem;
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

const GhostMiddleDiv = styled.div`
  flex: 21 21 auto;
  max-width: 2.1rem;
`;

const MusicLength = styled.div`
  flex: 120 120 auto;
  justify-self: flex-end;
  max-width: 12rem;
  font-style: normal;
  font-weight: bold;
  font-size: 2.9rem;
  color: rgba(0, 0, 0, 0.5);
`;

const AddButton = styled.button`
  flex: 62 62 auto;
  max-width: 5.5rem;
  min-width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background: #f7f2ed;
  box-shadow: 5px 5px 3px 3px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 5.5rem;
  border: none;
  color: #f04747;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

const StartButtonWrapper = styled.div`
  flex: 306 306 auto;
  max-width: 30.6rem;
  min-width: 30.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > svg {
    position: absolute;
    filter: drop-shadow(20px 20px 10px rgba(0, 0, 0, 0.12));
  }

  & > svg:hover rect {
    fill-opacity: 1;
  }
`;

const LetsGo = styled.div`
  display: inline-block;
  font-style: normal;
  font-weight: bold;
  font-size: 2.5rem;
  color: rgba(0, 0, 0, 0.8);
  margin-right: 1rem;
  margin-top: 1rem;
  margin-right: 9rem;
`;

const musicTimeFormat = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return `${hours > 0 ? `${hours}:` : ''}${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const Metadata = ({ currentMusic, currentPlaylist }) => {
  const {
    userInfo,
    musicList,
    playlist,
    setPlaylist,
    setMusicList,
    requestUserInfo,
  } = useContext(UserContext);
  const [displayModalMessage, setDisplayModalMessage] = useState(null);
  const navigate = useNavigate();

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
      setDisplayModalMessage('먼저 음악을 선택해 주세요.');
      return;
    }
    if (!currentPlaylist) {
      setDisplayModalMessage('먼저 플레이리스트를 선택해 주세요.');
      return;
    }

    if (musicList.length > 50) {
      setDisplayModalMessage('재생목록은 50곡까지만 추가할 수 있습니다.');
      return;
    }

    if (currentMusic['music_embeddable'] === 'false') {
      setDisplayModalMessage(
        '이 음악은 게시자가 사용할 수 없도록 지정한 영상입니다. 다른 영상을 사용해 주세요.'
      );
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
      {displayModalMessage && (
        <ConfirmModal
          text={displayModalMessage}
          handleModal={() => setDisplayModalMessage(null)}
        />
      )}
      <MetadataWrapper>
        <GhostLeftDiv />
        <MusicNameWrapper>
          <MusicName
            text={
              currentMusic['music_name'] ? currentMusic.music_name.length : 7
            }
          >
            {currentMusic['music_name'] ? currentMusic.music_name : 'loading'}
          </MusicName>
        </MusicNameWrapper>
        <GhostMiddleDiv />
        <MusicLength>
          {currentMusic['music_time']
            ? musicTimeFormat(currentMusic.music_time)
            : '--:--'}
        </MusicLength>
        <AddButton onClick={addToPlaylist}>+</AddButton>
        <StartButtonWrapper>
          <LetsGo>시작하기</LetsGo>
          <PlayIcon
            width={80}
            height={80}
            onClick={() => {
              navigate('/pomodoro');
            }}
          />
        </StartButtonWrapper>
      </MetadataWrapper>
    </MetadataContainer>
  );
};

export default Metadata;
