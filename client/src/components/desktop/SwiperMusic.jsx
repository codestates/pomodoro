import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { ReactComponent as Loading } from '../../images/loading.svg';
import PreviewPopup from './PreviewPopup';

SwiperCore.use([EffectCoverflow, Pagination, Mousewheel, Keyboard]);

const SERVER_ENDPOINT =
  process.env.REACT_APP_ENDPOINT || 'https://final.eax.kr';

const SwiperContainer = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
  padding-left: 3.2rem;
  padding-right: 3.2rem;

  & .swiper-slide {
    background-position: center;
    background-size: cover;
  }
  & .swiper-slide img,
  & .swiper-slide .loading-placeholder {
    border-radius: 2rem;
    width: 41.1rem;
    height: 29.1rem;
    object-fit: fill;
  }

  & .swiper-slide-shadow-left {
    border-radius: 2rem;
  }
  & .swiper-slide-shadow-right {
    border-radius: 2rem;
  }
`;

const LoadingPlaceHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(lightgray, var(--color-background), lightgray);
`;

const SwiperMusic = ({
  searchResult,
  currentTagIndex,
  currentMusic,
  setCurrentMusic,
}) => {
  const [displayPreview, setDisplayPreview] = useState(false);
  const swiperPos = useRef(null);

  let searchIndex,
    idx = -1;
  if (!searchResult?.length || !currentTagIndex) searchIndex = null;
  if (Array.isArray(searchResult))
    idx = searchResult.findIndex((item) => item.tag_id == currentTagIndex);
  searchIndex = idx === -1 ? null : idx;

  // const searchIndex = useMemo(() => {
  //   if (!searchResult?.length || !currentTagIndex) return null;
  //   const idx = searchResult.findIndex(
  //     (item) => item.tag_id == currentTagIndex
  //   );
  //   return idx === -1 ? null : idx;
  // }, [currentTagIndex]);

  const StoreSlideInfo = (swiper) => {
    const data = swiper.slides[swiper.activeIndex].dataset;
    setCurrentMusic(data);
  };

  return (
    <SwiperContainer ref={swiperPos}>
      {displayPreview && (
        <PreviewPopup
          URL={currentMusic?.music_url}
          closeHandler={() => setDisplayPreview(false)}
          posY={swiperPos.current?.offsetTop}
        />
      )}
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={0}
        slidesPerView={3}
        slidesPerGroup={1}
        mousewheel={true}
        keyboard={true}
        loop
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 130,
          modifier: 1,
          slideShadows: true,
        }}
        onUpdate={StoreSlideInfo}
        onSlideChange={StoreSlideInfo}
      >
        {searchResult[searchIndex] &&
        searchResult[searchIndex]['Musics'] &&
        searchResult[searchIndex].Musics.length
          ? searchResult[searchIndex].Musics?.map((item) => {
              return (
                <SwiperSlide
                  key={item.music_id}
                  data-music_name={item.music_name}
                  data-music_time={item.music_time}
                  data-music_url={item.music_url}
                  data-music_id={item.music_id}
                  data-music_embeddable={
                    item['music_embeddable'] === false ? 'false' : 'true'
                  }
                  onClick={() => setDisplayPreview(true)}
                >
                  <img
                    src={
                      item.music_thumbnail
                        ? item.music_thumbnail
                        : `${SERVER_ENDPOINT}/images/${item.music_url}.jpg`
                    }
                    alt={item.music_name}
                  />
                  ;
                </SwiperSlide>
              );
            })
          : Array({ len: 7 }).map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <LoadingPlaceHolder className="loading-placeholder">
                    <Loading width="15rem" height="15rem" />
                  </LoadingPlaceHolder>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </SwiperContainer>
  );
};

export default SwiperMusic;
