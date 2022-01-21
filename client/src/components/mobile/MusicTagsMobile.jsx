import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';

import 'swiper/css';

SwiperCore.use([Mousewheel]);

const TagButtons = styled.div`
  justify-self: center;
  align-self: center;
  margin: auto;
  padding: 0 2%;

  & .swiper-slide {
    min-height: calc(14px + 4vw);
    background-color: #ffbd6f;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2.5rem;
    box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
    font-style: normal;
    font-weight: bold;
    font-size: calc(12px + 1.5vw);
    line-height: 2rem;
    color: rgba(13, 24, 37, 0.8);
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  & .gray-loading-placeholder {
    max-width: 10rem;
    background-color: lightgray;
  }
`;

const torem = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

const calculateTagWidth = (s) => {
  const lowerCase = (s.match(/([a-z])/g)?.length || 0) * 1.6;
  const upperCase = (s.match(/([A-Z])/g)?.length || 0) * 2.4;
  const cjkLetter =
    (new TextEncoder('utf-16').encode(s).length - s.length || 0) * 1.2;
  const sum = lowerCase + upperCase + cjkLetter;
  const ratio = window.screen.width / window.screen.height;
  return sum * torem(0.21) * ratio;
};

const MusicTags = ({ tags, currentTagIndex, setCurrentTagIndex }) => {
  return (
    <TagButtons>
      <Swiper
        className="tagSwiper"
        spaceBetween={12}
        slidesPerView={'auto'}
        mousewheel={true}
      >
        {tags
          ? tags?.map((tag, index) => (
              <SwiperSlide
                key={tag.tag_id}
                data-id={index}
                style={{
                  backgroundColor:
                    currentTagIndex == index
                      ? 'rgba(81, 163, 30, 0.5)'
                      : '#ffbd6f',
                  maxWidth: `${calculateTagWidth(tag.tag_name)}rem`,
                  cursor: 'pointer',
                }}
                onClick={(e) => setCurrentTagIndex(e.target.dataset.id)}
              >
                {tag.tag_name}
              </SwiperSlide>
            ))
          : Array(5)
              .fill(null)
              .map((item, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="gray-loading-placeholder"
                  ></SwiperSlide>
                );
              })}
      </Swiper>
    </TagButtons>
  );
};

export default MusicTags;
