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

SwiperCore.use([EffectCoverflow, Pagination, Mousewheel, Keyboard]);

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

  background: linear-gradient(
    var(--color-menu),
    var(--color-background),
    var(--color-menu)
  );
`;

const SwiperMusic = ({ searchResult }) => {
  return (
    <SwiperContainer>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={false}
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
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {searchResult
          ? searchResult[0].Musics?.map((item) => {
              return (
                <SwiperSlide key={item.music_id}>
                  <img src={item.music_image} alt={item.music_name} />;
                </SwiperSlide>
              );
            })
          : Array(7).map((item, index) => {
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
