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
  & .swiper-slide img {
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

const SwiperMusic = ({ searchResult }) => {
  console.dir(searchResult);

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
        {searchResult.Musics?.map((item) => {
          return (
            <SwiperSlide key={item.music_id}>
              <img src={item.music_image} alt={item.music_name} />;
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SwiperContainer>
  );
};

/*
<Swiper
modules={[Virtual]}
spaceBetween={10}
slidesPerView={5}
slidesPerGroup={1}
loop
speed={500}
onSwiper={(swiper) => console.log(swiper)}
onSlideChange={() => console.log('slide change')}
virtual
>
<SwiperSlide virtualIndex={0}>Slide1</SwiperSlide>
<SwiperSlide virtualIndex={1}>Slide2</SwiperSlide>
<SwiperSlide virtualIndex={2}>Slide3</SwiperSlide>
<SwiperSlide virtualIndex={3}>Slide4</SwiperSlide>
<SwiperSlide virtualIndex={4}>Slide45</SwiperSlide>
</Swiper>
*/

export default SwiperMusic;
