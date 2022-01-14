import { useState, createContext } from 'react';
import styled from 'styled-components';

import SwiperMusic from '../../components/desktop/SwiperMusic';
import { ReactComponent as Search } from '../../images/search.svg';
import MusicTags from '../../components/desktop/MusicTags';
import Metadata from '../../components/desktop/Metadata';

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

export const CurrentMusicInfo = createContext({
  currentMusic: {},
  changeCurrentMusic: () => {},
});

const ChooseMusic = ({ tags, setTags }) => {
  const [currentMusic, setCurrentMusic] = useState({});

  const changeCurrentMusic = (music) => {
    setCurrentMusic(music);
  };

  return (
    <CurrentMusicInfo.Provider value={{ currentMusic, changeCurrentMusic }}>
      <MainContainer>
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
        <SwiperMusic searchResult={tags} />
        <Metadata />
      </MainContainer>
    </CurrentMusicInfo.Provider>
  );
};

export default ChooseMusic;
