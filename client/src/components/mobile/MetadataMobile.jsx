import { useContext } from 'react';
import styled from 'styled-components';

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

const MetadataMobile = ({ currentMusic }) => {
  const { requestUserInfo } = useContext(UserContext);

  const addToPlaylist = (e) => {
    requestUserInfo();
    e.preventDefault();
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
