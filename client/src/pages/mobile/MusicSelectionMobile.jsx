import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as SearchIcon } from '../../images/search.svg';
import { ReactComponent as TomatoPlayIcon } from '../../images/TomatoPlay.svg';
import MusicTagsMobile from '../../components/mobile/MusicTagsMobile';
import SwiperMusicMobile from '../../components/mobile/SwiperMusicMobile';
import MetadataMobile from '../../components/mobile/MetadataMobile';
import MenuForPlaylistMobile from '../../components/mobile/MenuForPlaylistMobile';
import MenuForMusiclistMobile from '../../components/mobile/MenuForMusiclistMobile';

const MobileContainer = styled.div`
  margin-top: ${({ size }) => size.start}px;
  height: ${({ size }) => size.end - size.start}px;
  display: grid;
  grid-template-rows: 0.1fr 1fr 0.2fr 6fr 1.8fr 2.7fr;
  background-color: var(--color-background);
`;

const TopGhostDiv = styled.div``;

const SearchBarAndTags = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 5fr;
`;

const SearchButton = styled.div`
  margin-left: 1rem;
  justify-self: center;
  align-self: center;

  border-radius: 50%;
  min-width: 0.2rem;
  min-height: 0.2rem;
  max-width: 11vmin;
  max-height: 11vmin;
  background: #f5f5f5;
  box-shadow: 0.5rem 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: '';
    height: 0;
  }

  &:hover {
    cursor: pointer;
    background-color: lightgrey;
  }

  & svg {
    padding: 20%;
  }
`;

const MiddleGhostDiv = styled.div``;

const ButtonsMobile = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

const ChooseMusicMobile = ({ tags, setTags }) => {
  const navigate = useNavigate();
  const thisRef = useRef(null);
  const [size, setSize] = useState({ start: 0, end: 0 });
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [currentMusic, setCurrentMusic] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  useEffect(() => {
    if (!thisRef || size.start) return;
    const payload = {
      start: thisRef.current.parentNode.previousElementSibling.clientHeight,
      end: thisRef.current.parentNode.nextElementSibling.offsetTop,
    };
    setSize(payload);
    //console.dir(payload);
    console.dir(thisRef);
  }, []);

  return (
    <MobileContainer ref={thisRef} size={size}>
      <TopGhostDiv />
      <SearchBarAndTags>
        <SearchButton>
          <SearchIcon />
        </SearchButton>
        <MusicTagsMobile
          tags={tags}
          currentTagIndex={currentTagIndex}
          setCurrentTagIndex={setCurrentTagIndex}
        />
      </SearchBarAndTags>
      <MiddleGhostDiv></MiddleGhostDiv>
      <SwiperMusicMobile
        searchResult={tags}
        currentTagIndex={currentTagIndex}
        setCurrentMusic={setCurrentMusic}
      />
      <MetadataMobile currentMusic={currentMusic} />
      <ButtonsMobile>
        <MenuForPlaylistMobile
          size={size}
          currentPlaylist={currentPlaylist}
          setCurrentPlaylist={setCurrentPlaylist}
        />
        <TomatoPlayIcon
          style={{
            filter: 'drop-shadow(20px 20px 10px rgba(0, 0, 0, 0.12))',
          }}
          width="16vw"
          height="16vw"
          onClick={() => {
            navigate('/pomodoro');
          }}
        />
        <MenuForMusiclistMobile size={size} currentPlaylist={currentPlaylist} />
      </ButtonsMobile>
    </MobileContainer>
  );
};

export default ChooseMusicMobile;
