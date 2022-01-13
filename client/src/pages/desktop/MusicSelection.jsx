import { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import SwiperMusic from '../../components/desktop/SwiperMusic';
import { ReactComponent as Search } from '../../images/search.svg';
import MusicTags from '../../components/desktop/MusicTags';

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

const ChooseMusic = () => {
  const [searchResult, setSearchResult] = useState(false);

  useLayoutEffect(() => {
    const endpoint = 'https://final.eax.kr/api/tags';
    async function fetchData() {
      const result = await axios(endpoint);
      for (const item of result.data.result[0].Musics) {
        try {
          const url = `https://final.eax.kr/images/${item.music_url}.jpg`;
          const image = await axios.get(url, { responseType: 'arraybuffer' });
          const base64string = btoa(
            String.fromCharCode(...new Uint8Array(image.data))
          );
          item.music_image = `data:image/jpeg;base64,${base64string}`;
        } catch (e) {
          console.dir(e);
          item.music_image = `https://i.ytimg.com/vi/${item.music_url}/hqdefault.jpg`;
        }
      }
      setSearchResult(result.data.result);
    }
    fetchData();
  }, []);

  return (
    // <FlexWrapper>
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
          {searchResult ? (
            <MusicTags tags={searchResult} />
          ) : (
            <div>Loading...</div>
          )}
        </TagWrapper>
      </PlaylistSelectFlexBox>
      {searchResult ? (
        <SwiperMusic searchResult={searchResult[0]} />
      ) : (
        <div>Loading...</div>
      )}
    </MainContainer>
    // </FlexWrapper>
  );
};

export default ChooseMusic;
