import React, { useEffect, useState } from 'react';
import arrowUp from '../../images/arrowUp.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

const GoTopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f57270;
  position: fixed;
  right: 5%;
  bottom: 9rem;
  width: ${(props) => (props.isMobile ? '4rem' : '7rem')};
  height: ${(props) => (props.isMobile ? '4rem' : '7rem')};
  border: none;
  border-radius: 100%;
  z-index: 1;

  > img {
    width: 80%;
    height: 80%;
  }
`;

const ScrollToTop = ({ isMobile }) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    const toggleVisible = () => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          const scrollY = document.documentElement.scrollTop;

          if (scrollY > 200) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        }, 200);
      }
    };

    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Wrapper isVisible={isVisible}>
      <GoTopButton isMobile={isMobile} onClick={goTop}>
        <img src={arrowUp} alt="back to top"></img>
      </GoTopButton>
    </Wrapper>
  );
};

export default ScrollToTop;
