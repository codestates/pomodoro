import { useContext } from 'react';
import styled from 'styled-components';

import { CurrentMusicInfo } from '../../pages/desktop/MusicSelection';
import { UserContext } from '../../App';

const MetadataContainer = styled.div`
  margin: 2rem auto 0 auto;
  max-width: 59.7rem;
`;

const MetadataWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const GhostLeftDiv = styled.div`
  flex: 93 93 auto;
  max-width: 9.3rem;
  min-width: 9.3rem;
`;

const MusicNameWrapper = styled.div`
  flex: 299 299 auto;
  max-width: 29.9rem;
  font-style: normal;
  font-weight: bold;
  font-size: 3.1rem;
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
  flex: 100 100 auto;
  max-width: 10rem;
  font-style: normal;
  font-weight: bold;
  font-size: 3.1rem;
  color: rgba(0, 0, 0, 0.5);
`;

const AddButton = styled.button`
  flex: 62 62 auto;
  max-width: 5.5rem;
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
    background-color: lightgreen;
  }
`;

const Metadata = () => {
  const { currentMusic } = useContext(CurrentMusicInfo);
  const { requestUserInfo } = useContext(UserContext);

  const musicTimeFormat = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const addToPlaylist = (e) => {
    requestUserInfo();
    e.preventDefault();
  };

  return (
    <MetadataContainer>
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
      </MetadataWrapper>
    </MetadataContainer>
  );
};

export default Metadata;
