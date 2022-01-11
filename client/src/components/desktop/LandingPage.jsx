import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';
import img5 from '../../images/img5.png';
import img6 from '../../images/img6.png';

const Wrapper = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 3rem;

  > div {
    padding: 6rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: center;
    align-items: center;

    > div.landing-6 {
      > div:last-child {
        display: flex;
        justify-content: center;
      }
    }

    div.box {
      display: flex;
      justify-content: center;

      img {
        &.left {
          transform: translateX(-100px);
        }

        &.right {
          transform: translateX(100px);
        }

        opacity: 0;
        width: 90%;
        transition: 0.3s linear;
      }
    }

    h1 {
      text-align: center;
      font-size: 4.5rem;
      margin-bottom: 3rem;

      &.line-height {
        margin-top: 3rem;
        margin-bottom: 4rem;
        line-height: 10rem;
      }
    }

    p {
      font-size: 2rem;
      font-weight: 700;
      line-height: 5rem;
      margin-bottom: 5rem;
    }

    div.text {
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
      line-height: 7rem;
      margin-bottom: 3rem;
    }
  }

  button {
    background-color: #f57270;
    border: none;
    color: #ffffff;
    font-size: 3rem;
    font-weight: 700;
    padding: 2.5rem 4.5rem;
    border-radius: 50px;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }
`;

const LandingPage = () => {
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const boxArray = [box1, box2, box3, box4, box5, box6];
    let animation1, animation2, animation3, animation4, animation5, animation6;
    const animations = [
      animation1,
      animation2,
      animation3,
      animation4,
      animation5,
      animation6,
    ];

    boxArray.forEach((box, idx) => {
      animations[idx] = gsap.to(box.current, {
        scrollTrigger: {
          trigger: box.current,
          toggleActions: 'play reset restart reset',
          markers: true,
          start: 'center 650px',
          end: 'bottom 150px',
        },
        ease: 'elastic',
        opacity: 1,
        x: 0,
      });
    });

    return () => {
      animations.forEach((animation) => {
        animation.kill();
      });
    };
  }, []);

  return (
    <Wrapper>
      <div>
        <div className="box">
          <img
            className="box1 left"
            src={img1}
            alt="landing img1"
            ref={box1}
          ></img>
        </div>
        <div>
          <h1 className="text-left">집중하고 계신가요?</h1>
          <p className="text-left">
            COVID-19으로 재택근무자와 취준생이 늘었습니다.
            <br />
            하지만 휴식의 공간인 집에서 휴식 외의 일을
            <br />
            한다는 것은 강한 의지를 요구하는 일입니다.
            <br />
            집중을 도와줄 Pomodoro 사용해보세요!
          </p>
        </div>
      </div>

      <div>
        <div>
          <h1 className="line-height text-right">
            25분 집중
            <br />
            5분 휴식
          </h1>
          <p className="text-right">
            뽀모도로 기법은 시간 관리 방법론으로,
            <br />
            타이머를 이용해서 25분간 집중해서
            <br />
            일을 한 다음 5분간 휴식하는 방식입니다.
            <br />
            {'(Pomodoro, 이탈리아어로 토마토를 의미)'}
          </p>
        </div>
        <div className="box">
          <img
            className="box2 right"
            src={img2}
            alt="landing img2"
            ref={box2}
          ></img>
        </div>
      </div>

      <div>
        <div className="box">
          <img
            className="box3 left"
            src={img3}
            alt="landing img3"
            ref={box3}
          ></img>
        </div>
        <div>
          <h1 className="line-height">
            뽀모도로로
            <br />
            시간을
            <br />
            관리해보세요
          </h1>
        </div>
      </div>

      <div>
        <div>
          <h1 className="line-height">
            Youtube와 함께
            <br />
            원하는 음악으로
          </h1>
        </div>
        <div className="box">
          <img
            className="box4 right"
            src={img4}
            alt="landing img4"
            ref={box4}
          ></img>
        </div>
      </div>

      <div>
        <div className="box">
          <img
            className="box5 left"
            src={img5}
            alt="landing img5"
            ref={box5}
          ></img>
        </div>
        <div>
          <h1 className="line-height">
            랭킹을 통해
            <br />
            다른 유저와
            <br />
            경쟁도 가능해요
          </h1>
        </div>
      </div>

      <div>
        <div className="landing-6">
          <div className="text text-right">
            뽀모도로를 이용해
            <br />
            나만의 플레이리스트를
            <br />
            완성하세요.
          </div>
          <div className="text text-right">
            모바일과 데스크톱 모두
            <br />
            편리하게 사용이 가능합니다.
          </div>
          <div>
            <button>지금 체험하러 가기</button>
          </div>
        </div>
        <div className="box">
          <img
            className="box6 right"
            src={img6}
            alt="landing img 6"
            ref={box6}
          ></img>
        </div>
      </div>
    </Wrapper>
  );
};

export default LandingPage;
