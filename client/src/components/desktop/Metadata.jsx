import { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as PlayIcon } from '../../images/TomatoPlay.svg';
import { UserContext } from '../../App';

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

  & > svg:hover path {
    fill: yellow;
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
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const Metadata = ({ currentMusic }) => {
  const { requestUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

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
