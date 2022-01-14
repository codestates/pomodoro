import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';
import img5 from '../../images/img5.png';
import img6 from '../../images/img6.png';
import ScrollToTop from '../../components/desktop/ScrollToTop';

const Wrapper = styled.main`
  max-width: 1320px;
  margin: 0 auto;
  padding: 3rem;

  .up {
    opacity: 0;
    transform: translateY(25px);
    transition: 0.3s linear;
  }

  .down {
    opacity: 0;
    transform: translateY(-25px);
    transition: 0.3s linear;
  }

  .padding-left {
    padding-left: 15rem;
  }

  .padding-right {
    padding-right: 15rem;
  }
`;

const Section = styled.section`
  padding: 12rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  align-items: center;

  &.last {
    padding-bottom: 3rem;
  }
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

    &.img6 {
      width: 60%;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &.align-left {
    align-items: flex-start;

    p {
      text-align: left;
    }
  }

  &.align-right {
    align-items: flex-end;

    p {
      text-align: right;
    }
  }
`;

const TitleContent = styled.h1`
  text-align: center;
  font-size: 4.5rem;
  margin-bottom: 3rem;

  &.line-height {
    margin-top: 3rem;
    margin-bottom: 2rem;
    line-height: 10rem;
  }

  &.last-text {
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    line-height: 6rem;
    margin-bottom: 3rem;
  }
`;

const TextContent = styled.p`
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
  line-height: 5rem;
  margin-bottom: 5rem;
`;

const StartButton = styled.button`
  background-color: #f57270;
  border: none;
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  padding: 2.5rem 4.5rem;
  border-radius: 50px;
`;

const LandingPage = () => {
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const textBox1 = useRef(null);
  const textBox2 = useRef(null);
  const textBox3 = useRef(null);
  const textBox4 = useRef(null);
  const textBox5 = useRef(null);
  const textBox6 = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const boxArray = [box1, box2, box3, box4, box5, box6];

    const textBoxArray = [
      textBox1,
      textBox2,
      textBox3,
      textBox4,
      textBox5,
      textBox6,
    ];

    let animation1,
      animation2,
      animation3,
      animation4,
      animation5,
      animation6,
      animation7,
      animation8,
      animation9,
      animation10,
      animation11,
      animation12;

    const boxAnimations = [
      animation1,
      animation2,
      animation3,
      animation4,
      animation5,
      animation6,
    ];

    const textBoxAnimations = [
      animation7,
      animation8,
      animation9,
      animation10,
      animation11,
      animation12,
    ];

    boxArray.forEach((box, idx) => {
      boxAnimations[idx] = gsap.to(box.current, {
        scrollTrigger: {
          trigger: box.current,
          toggleActions: 'play reset restart reset',
          start: 'top 610px',
          end: 'bottom 180px',
        },
        ease: 'elastic',
        opacity: 1,
        x: 0,
      });
    });

    textBoxArray.forEach((textBox, idx) => {
      textBoxAnimations[idx] = gsap.to(textBox.current, {
        scrollTrigger: {
          trigger: textBox.current,
          toggleActions: 'play reset restart reset',
          start: 'top 650px',
          end: 'bottom 150px',
        },
        ease: 'elastic',
        opacity: 1,
        y: 0,
      });
    });

    return () => {
      boxAnimations.forEach((animation) => animation.kill());
      textBoxAnimations.forEach((animation) => animation.kill());
    };
  }, []);

  return (
    <Wrapper>
      <Section>
        <ImgContainer>
          <img className="from-left" src={img1} alt="landing img1" ref={box1} />
        </ImgContainer>
        <TextContainer className="align-left padding-left up" ref={textBox1}>
          <TitleContent>집중하고 계신가요?</TitleContent>
          <TextContent>
            COVID-19으로 재택근무자와 취준생이 늘었습니다.
            <br />
            하지만 휴식의 공간인 집에서 휴식 외의 일을 한다는 건 강한 의지를
            요구하는 일입니다.
            <br />
            집중을 도와줄 Pomodoro 사용해보세요!
          </TextContent>
        </TextContainer>
      </Section>

      <Section>
        <TextContainer className="align-right padding-right up" ref={textBox2}>
          <TitleContent className="line-height">
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
        <TextContainer>
          <TitleContent className="line-height up" ref={textBox3}>
            뽀모도로로
            <br />
            시간을
            <br />
            관리해보세요
          </TitleContent>
        </TextContainer>
      </Section>

      <Section>
        <TextContainer>
          <TitleContent className="line-height up" ref={textBox4}>
            Youtube와 함께
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
        <TextContainer>
          <TitleContent className="line-height up" ref={textBox5}>
            랭킹을 통해
            <br />
            다른 유저와
            <br />
            경쟁도 가능해요
          </TitleContent>
        </TextContainer>
      </Section>

      <Section className="last">
        <TextContainer className="up" ref={textBox6}>
          <TitleContent className="last-text">
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
          <Link to="/music">
            <StartButton>지금 체험하러 가기</StartButton>
          </Link>
        </TextContainer>
        <ImgContainer>
          <img
            className="img6 from-right"
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
