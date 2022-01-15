import { useState, createContext } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

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
  margin-top: 3.5rem;
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
  const [currentMusic, setCurrentMusic] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  return (
    <MainContainer>
      {screenShouldShrink ? (
        <>
          <PlaylistSelectLabel style={{ marginLeft: '6.5rem' }}>
            플레이리스트 선택
          </PlaylistSelectLabel>
          <ShrinkFlexBox>
            <SearchButtonWrapper>
              <SearchButton>
                <Search />
              </SearchButton>
            </SearchButtonWrapper>
            <TagWrapper>
              <MusicTags tags={tags} />
            </TagWrapper>
          </ShrinkFlexBox>
        </>
      ) : (
        <PlaylistSelectFlexBox>
          <PlaylistGhostDiv />
          <PlaylistSelectLabel>플레이리스트 선택</PlaylistSelectLabel>
          <SearchButtonWrapper>
            <SearchButton>
              <Search />
            </SearchButton>
          </SearchButtonWrapper>
          <TagWrapper>
            <MusicTags tags={tags} />
          </TagWrapper>
        </PlaylistSelectFlexBox>
      )}
      <SwiperMusic searchResult={tags} setCurrentMusic={setCurrentMusic} />
      <Metadata currentMusic={currentMusic} />
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
