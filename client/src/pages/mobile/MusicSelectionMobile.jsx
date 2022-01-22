import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ConfirmModal } from '../../components/desktop/ConfirmModal';
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

  & > svg {
    filter: drop-shadow(20px 20px 10px rgba(0, 0, 0, 0.12));
  }

  & > svg:hover rect {
    fill-opacity: 1;
  }
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
  const [displayModalMessage, setDisplayModalMessage] = useState(null);

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

    if (!searchText) {
      setDisplayModalMessage('검색어를 입력해 주세요.');
      return;
    }

    const youtubeRegEx = [
      /(?<=\w*youtu\.be\/)(.*)/g,
      /(?<=\w*youtube\.com\/watch\?v=)(.*)(?=[&])|(?<=\w*youtube\.com\/watch\?v=)(.*)/g,
    ];
    for (const reg of youtubeRegEx) {
      const result = searchText.match(reg);
      if (!result) continue;
      //(result).then((data) => {
      const endpoint = `https://final.eax.kr/api/playlists/0`;
      const body = {
        music_url: result,
      };
      axios
        .post(endpoint, body)
        .then((res) => {
          const newTags = [...tags];
          let tag_id;
          if (newTags[0].tag_id < 0) tag_id = newTags[0].tag_id - 1;
          else tag_id = -1;
          const Musics = [
            {
              music_id: Math.floor(Math.random() * 1000000) + 1000000,
              music_name: res.data.title,
              music_url: res.data.music_url,
              music_time: res.data.duration,
              music_thumbnail: res.data.thumbnailUrl,
              music_embeddable: res.data.embeddable,
            },
          ];
          const payload = {
            tag_id,
            tag_name: res.data.title.slice(0, 8),
            Musics,
          };
          newTags.unshift(payload);
          setTags(newTags);
          setCurrentTagIndex(tag_id);
          fadeOutHandler();
          if (!res.data.embeddable)
            setDisplayModalMessage(
              '이 음악은 게시자가 사용할 수 없도록 지정한 영상입니다. 다른 영상을 사용해 주세요.'
            );
        })
        .catch((err) => {
          setDisplayModalMessage(
            '검색 결과가 없습니다. Youtube 주소가 올바른지 확인해 주세요.'
          );
          console.dir(err);
        });
      return;
    }

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
        setCurrentTagIndex(tag_id);
        fadeOutHandler();
      })
      .catch((err) => {
        if (err?.response.status === 400) {
          setDisplayModalMessage('검색 결과가 없습니다.');
          return;
        }
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
  }, []);

  return (
    <MobileContainer ref={thisRef} size={size}>
      {displayModalMessage && (
        <ConfirmModal
          text={displayModalMessage}
          handleModal={() => setDisplayModalMessage(null)}
        />
      )}
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
      <MetadataMobile
        currentMusic={currentMusic}
        currentPlaylist={currentPlaylist}
      />
      <ButtonsMobile>
        <MenuForPlaylistMobile
          size={size}
          currentPlaylist={currentPlaylist}
          setCurrentPlaylist={setCurrentPlaylist}
        />
        <TomatoPlayIcon
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
