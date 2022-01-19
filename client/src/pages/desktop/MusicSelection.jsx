import { useState, createContext, useRef } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

import { ConfirmModal } from '../../components/desktop/ConfirmModal';
import SwiperMusic from '../../components/desktop/SwiperMusic';
import { ReactComponent as Search } from '../../images/search.svg';
import MusicTags from '../../components/desktop/MusicTags';
import Metadata from '../../components/desktop/Metadata';
import MenuForPlaylist from '../../components/desktop/MenuForPlaylist';
import MenuForMusicList from '../../components/desktop/MenuForMusiclist';

const MainContainer = styled.div`
  max-width: 132rem;
  min-width: 75.7rem;
  margin: auto;
`;

const PlaylistSelectFlexBox = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
  height: 7.3rem;
`;

const PlaylistGhostDiv = styled.div`
  flex: 65 1 auto;
  max-width: 6.5rem;
`;

const PlaylistSelectLabel = styled.div`
  flex: 378 1 auto;
  max-width: 37.8rem;
  font-size: 3.7rem;
  font-style: normal;
  font-weight: bold;
  color: #111032;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const SearchButtonWrapper = styled.div`
  flex: 73 1 7.3rem;
  max-width: 7.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchButton = styled.div`
  border-radius: 50%;
  height: 5.9rem;
  width: 5.9rem;
  background: #f5f5f5;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: lightgrey;
  }

  & svg {
    width: 3.52rem;
    height: 3.27rem;
  }
`;

const SearchBarContainer = styled.div`
  visibility: ${({ expandSearchBar }) =>
    expandSearchBar ? 'visible' : 'hidden'};
  position: absolute;
  max-width: 85.1rem;
  left: ${({ posX }) => posX?.offsetLeft}px;
  width: ${({ size, posX }) => size?.offsetWidth + posX?.offsetWidth}px;
  height: 7rem;
  background: #f5f5f5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  display: grid;
  grid-template-columns: 1fr 1.5fr 0.5fr 32.4fr;

  z-index: 10;

  & svg {
    width: 3.52rem;
    height: 3.27rem;
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
  font-size: 2.7rem;
  color: #7e7e7e;
  background: #f5f5f5;
`;

const GhostDiv = styled.div``;

const TagWrapper = styled.div`
  flex: 804 1 auto;
  max-width: 80.4rem;
`;

const PlaylistContainer = styled.div`
  max-width: 123.3rem;
  min-height: 23rem;
  margin: 3rem auto 2rem auto;
  display: flex;
`;

const PlaylistGhostMiddleDiv = styled.div`
  flex: 28 28 auto;
  max-width: 2.8rem;
`;

const ShrinkFlexBox = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
`;

export const CurrentPlaylistInfo = createContext({
  currentPlaylist: null,
  setCurrentPlaylist: () => {},
});

const ChooseMusic = ({ tags, setTags }) => {
  const screenShouldShrink = useMediaQuery({ query: '(max-width: 1065px)' });
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [currentMusic, setCurrentMusic] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [expandSearchBar, setExpandSearchBar] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [displayModalMessage, setDisplayModalMessage] = useState(null);
  const tagsRef = useRef(null);
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
    if (e.code !== 'Enter') return;
    const endpoint = `https://final.eax.kr/api/search?q=${searchText}`;
    axios
      .get(endpoint)
      .then((res) => {
        if (res.data.result.length === 0) {
          setDisplayModalMessage('검색 결과가 없습니다.');
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

  return (
    <MainContainer>
      {displayModalMessage && (
        <ConfirmModal
          text={displayModalMessage}
          handleModal={() => setDisplayModalMessage(null)}
        />
      )}
      {screenShouldShrink ? (
        <>
          <PlaylistSelectLabel
            style={{ marginLeft: '6.5rem', marginTop: '1.5rem' }}
          >
            플레이리스트 선택
          </PlaylistSelectLabel>
          <ShrinkFlexBox>
            <SearchButtonWrapper>
              <SearchButton
                ref={searchRef}
                onClick={() => {
                  setFadeOut(false);
                  setExpandSearchBar(true);
                  setTimeout(() => {
                    focusRef.current.focus();
                  }, 500);
                }}
              >
                <Search />
              </SearchButton>
              <SearchBarContainer
                expandSearchBar={expandSearchBar}
                fadeOut={fadeOut}
                posX={searchRef?.current ? searchRef.current : null}
                size={tagsRef?.current ? tagsRef.current : null}
              >
                <GhostDiv />
                <Search onClick={fadeOutHandler} />
                <GhostDiv />
                <SearchText
                  ref={focusRef}
                  type="text"
                  placeholder="검색어를 입력하세요 (혹은 Youtube 주소 입력)"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyUp={searchHandler}
                />
              </SearchBarContainer>
            </SearchButtonWrapper>
            <TagWrapper ref={tagsRef}>
              <MusicTags
                tags={tags}
                currentTagIndex={currentTagIndex}
                setCurrentTagIndex={setCurrentTagIndex}
              />
            </TagWrapper>
          </ShrinkFlexBox>
        </>
      ) : (
        <PlaylistSelectFlexBox>
          <PlaylistGhostDiv />
          <PlaylistSelectLabel>플레이리스트 선택</PlaylistSelectLabel>
          <SearchButtonWrapper>
            <SearchButton
              ref={searchRef}
              onClick={() => {
                setFadeOut(false);
                setExpandSearchBar(true);
                setTimeout(() => {
                  focusRef.current.focus();
                }, 500);
              }}
            >
              <Search />
            </SearchButton>
            <SearchBarContainer
              expandSearchBar={expandSearchBar}
              fadeOut={fadeOut}
              posX={searchRef?.current ? searchRef.current : null}
              size={tagsRef?.current ? tagsRef.current : null}
            >
              <GhostDiv />
              <Search onClick={fadeOutHandler} />
              <GhostDiv />
              <SearchText
                ref={focusRef}
                type="text"
                placeholder="검색어를 입력하세요 (혹은 Youtube 주소 입력)"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={searchHandler}
              />
            </SearchBarContainer>
          </SearchButtonWrapper>
          <TagWrapper ref={tagsRef}>
            <MusicTags
              tags={tags}
              currentTagIndex={currentTagIndex}
              setCurrentTagIndex={setCurrentTagIndex}
            />
          </TagWrapper>
        </PlaylistSelectFlexBox>
      )}
      <SwiperMusic
        searchResult={tags}
        currentTagIndex={currentTagIndex}
        setCurrentMusic={setCurrentMusic}
      />
      <Metadata currentMusic={currentMusic} currentPlaylist={currentPlaylist} />
      <PlaylistContainer>
        <MenuForPlaylist
          currentPlaylist={currentPlaylist}
          setCurrentPlaylist={setCurrentPlaylist}
        />
        <PlaylistGhostMiddleDiv />
        <MenuForMusicList currentPlaylist={currentPlaylist} />
      </PlaylistContainer>
    </MainContainer>
  );
};

export default ChooseMusic;
