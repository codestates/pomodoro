import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const SearchBarContainer = styled.div`
  visibility: ${({ expandSearchBar }) =>
    expandSearchBar ? 'visible' : 'hidden'};
  position: absolute;
  width: 95vw;
  left: 2.5vw;
  align-self: center;
  height: 7rem; //TODO
  background: #f5f5f5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  display: grid;
  grid-template-columns: 0.2fr 1fr 7.5fr;

  z-index: 10;

  & svg {
    width: 60%;
    height: 60%;
    justify-self: center;
    align-self: center;
  }

  transform-origin: top left;
  animation: ${({ fadeOut }) =>
    fadeOut ? 'fadeoutSearchBar 1s' : 'fadeinSearchBar 1s'};

  @keyframes fadeinSearchBar {
    from {
      opacity: 0;
      transform: scaleX(0.1);
    }
    to {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  @keyframes fadeoutSearchBar {
    from {
      opacity: 1;
      transform: scaleX(1);
    }
    to {
      opacity: 0;
      transform: scaleX(0.1);
    }
  }
`;

const SearchText = styled.input`
  align-self: center;
  font-style: normal;
  font-weight: bold;
  font-size: 2.5rem;
  color: #7e7e7e;
  background: #f5f5f5;
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
  const [expandSearchBar, setExpandSearchBar] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef(null);
  const focusRef = useRef(null);

  const fadeOutHandler = () => {
    setFadeOut(true);
    setTimeout(() => {
      setFadeOut(false);
      setExpandSearchBar(false);
    }, 500);
  };

  const searchHandler = (e) => {
    if (e.key !== 'Enter') return;
    const endpoint = `https://final.eax.kr/api/search?q=${searchText}`;
    axios
      .get(endpoint)
      .then((res) => {
        if (res.data.result.length === 0) {
          alert('검색 결과가 없습니다.');
          return;
        }
        const newTags = [...tags];
        let tag_id;
        if (newTags[0].tag_id < 0) tag_id = newTags[0].tag_id - 1;
        else tag_id = -1;
        const payload = {
          tag_id,
          tag_name: searchText,
          Musics: res.data.result,
        };
        newTags.unshift(payload);
        setTags(newTags);
        setCurrentPlaylist(tag_id);
        fadeOutHandler();
      })
      .catch((err) => {
        console.dir(err);
      });
  };

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
          <SearchIcon
            ref={searchRef}
            onClick={() => {
              setFadeOut(false);
              setExpandSearchBar(true);
              setTimeout(() => {
                focusRef.current.focus();
              }, 500);
            }}
          />
        </SearchButton>
        <SearchBarContainer expandSearchBar={expandSearchBar} fadeOut={fadeOut}>
          <MiddleGhostDiv />
          <SearchIcon onClick={fadeOutHandler} />
          <SearchText
            ref={focusRef}
            type="text"
            placeholder="검색어를 입력하세요 (혹은 Youtube 주소 입력)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={searchHandler}
          />
        </SearchBarContainer>
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
