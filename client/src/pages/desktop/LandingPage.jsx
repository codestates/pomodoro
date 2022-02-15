import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import gsap, { ScrollTrigger } from 'gsap/all';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';
import img5 from '../../images/img5.png';
import img6 from '../../images/img6.png';
import ScrollToTop from '../../components/desktop/ScrollToTop';

const Wrapper = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 3rem;
`;

const Section = styled.section`
  padding: 12rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  img {
    width: 90%;
    opacity: 0;
    transition: 0.3s linear;

    &.from-left {
      transform: translateX(-100px);
    }

    &.from-right {
      transform: translateX(100px);
    }

    &.last {
      width: 60%;
    }
  }
`;

const TextContainer = styled.div`
  display: grid;
  align-content: center;
  height: 100%;
  opacity: 0;
  padding-top: 25px;
  transition: 0.3s linear;
  white-space: nowrap;
`;

const TitleContent = styled.h1`
  text-align: center;
  font-size: 4.5rem;
  margin-bottom: 3rem;
  line-height: 6rem;

  &.last {
    font-size: 3rem;
    font-weight: 700;
  }
`;

const TextContent = styled.p`
  width: 100%;
  margin-bottom: 5rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  line-height: 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StartButton = styled.button`
  background-color: #f57270;
  padding: 2.5rem 4.5rem;
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  border-radius: 50px;
  border: none;
`;

const LandingPage = () => {
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);
  const text4 = useRef(null);
  const text5 = useRef(null);
  const text6 = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const animations = new Array(12);
    const boxes = [
      box1,
      box2,
      box3,
      box4,
      box5,
      box6,
      text1,
      text2,
      text3,
      text4,
      text5,
      text6,
    ];

    boxes.forEach((box, idx) => {
      animations[idx] = gsap.to(box.current, {
        scrollTrigger: {
          trigger: box.current,
          toggleActions: 'play reset restart reset',
          start: 'top 650px',
          end: 'bottom 150px',
        },
        ease: 'elastic',
        opacity: 1,
        padding: 0,
        x: 0,
      });
    });

    return () => {
      animations.forEach((animation) => animation.scrollTrigger.kill());
    };
  }, []);

  return (
    <Wrapper>
      <Section>
        <ImgContainer>
          <img className="from-left" src={img1} alt="landing img1" ref={box1} />
        </ImgContainer>
        <TextContainer ref={text1}>
          <TitleContent>집중하고 계신가요?</TitleContent>
          <TextContent>
            COVID-19으로 재택근무자와 취준생이 늘었습니다.
            <br />
            하지만 휴식의 공간인 집에서 휴식 외의 일을 한다는
            <br />
            건 강한 의지를 요구하는 일입니다.
            <br />
            집중을 도와줄 Pomodoro 사용해보세요!
          </TextContent>
        </TextContainer>
      </Section>

      <Section>
        <TextContainer ref={text2}>
          <TitleContent>
            25분 집중
            <br />
            5분 휴식
          </TitleContent>
          <TextContent>
            뽀모도로 기법은 시간 관리 방법론으로,
            <br />
            타이머를 이용해서 25분간 집중해서
            <br />
            일을 한 다음 5분간 휴식하는 방식입니다.
            <br />
            {'(Pomodoro, 이탈리아어로 토마토를 의미)'}
          </TextContent>
        </TextContainer>
        <ImgContainer>
          <img
            className="from-right"
            src={img2}
            alt="landing img2"
            ref={box2}
          />
        </ImgContainer>
      </Section>

      <Section>
        <ImgContainer>
          <img className="from-left" src={img3} alt="landing img3" ref={box3} />
        </ImgContainer>
        <TextContainer ref={text3}>
          <TitleContent>
            뽀모도로로
            <br />
            <br />
            시간을
            <br />
            <br />
            관리해 보세요
          </TitleContent>
        </TextContainer>
      </Section>

      <Section>
        <TextContainer ref={text4}>
          <TitleContent>
            Youtube와 함께
            <br />
            <br />
            원하는 음악으로
          </TitleContent>
        </TextContainer>
        <ImgContainer>
          <img
            className="from-right"
            src={img4}
            alt="landing img4"
            ref={box4}
          />
        </ImgContainer>
      </Section>

      <Section>
        <ImgContainer>
          <img className="from-left" src={img5} alt="landing img5" ref={box5} />
        </ImgContainer>
        <TextContainer ref={text5}>
          <TitleContent>
            랭킹을 통해
            <br />
            <br />
            다른 유저와
            <br />
            <br />
            경쟁도 가능해요
          </TitleContent>
        </TextContainer>
      </Section>

      <Section>
        <TextContainer ref={text6}>
          <TitleContent className="last">
            뽀모도로를 이용해
            <br />
            나만의 플레이리스트를
            <br />
            완성하세요.
            <br />
            <br />
            모바일과 데스크톱 모두
            <br />
            편리하게 사용이 가능합니다.
          </TitleContent>
          <ButtonContainer>
            <StartButton>
              <Link to="/music">지금 체험하러 가기</Link>
            </StartButton>
          </ButtonContainer>
        </TextContainer>
        <ImgContainer>
          <img
            className="last from-right"
            src={img6}
            alt="landing img 6"
            ref={box6}
          />
        </ImgContainer>
      </Section>
      <ScrollToTop isMobile={false} />
    </Wrapper>
  );
};

export default LandingPage;
