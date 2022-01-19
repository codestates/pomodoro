import styled from 'styled-components';
import { Swiper, SwiperSlide, useRef } from 'swiper/react';

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

SwiperCore.use([EffectCoverflow, Pagination, Mousewheel, Keyboard]);

const SwiperContainer = styled.div`
  align-self: center;
  width: 100vw;
  & .swiper-slide {
    background-position: center;
    background-size: cover;
    left: 10vw;
  }
  & .swiper-slide img,
  & .swiper-slide .loading-placeholder {
    border-radius: 2rem;
    width: 80%;
    height: 100%;
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
  width: 70%;

  background: linear-gradient(lightgray, var(--color-background), lightgray);
`;

const SwiperMusicMobile = ({
  searchResult,
  currentTagIndex,
  setCurrentMusic,
}) => {
  const StoreSlideInfo = (swiper) => {
    const data = swiper.slides[swiper.activeIndex].dataset;
    setCurrentMusic(data);
  };

  return (
    <SwiperContainer>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={-100}
        slidesPerView={1}
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
        {searchResult[currentTagIndex] &&
        searchResult[currentTagIndex]['Musics'] &&
        searchResult[currentTagIndex].Musics.length
          ? searchResult[currentTagIndex].Musics?.map((item) => {
              return (
                <SwiperSlide
                  key={item.music_id}
                  data-music_name={item.music_name}
                  data-music_time={item.music_time}
                  data-music_url={item.music_url}
                  data-music_id={item.music_id}
                >
                  <img
                    src={`https://final.eax.kr/images/${item.music_url}.jpg`}
                    alt={item.music_name}
                  />
                  ;
                </SwiperSlide>
              );
            })
          : Array({ len: 3 }).map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <LoadingPlaceHolder className="loading-placeholder">
                    <Loading
                      style={{ margin: '25% 0' }}
                      width="8rem"
                      height="8rem"
                    />
                  </LoadingPlaceHolder>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </SwiperContainer>
  );
};

export default SwiperMusicMobile;
