import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Tomato } from '../../images/tomatoGlow.svg';

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => (props.isMobile ? '30rem' : '37.5rem')};
  height: ${(props) => (props.isMobile ? '30rem' : '37.5rem')};

  .timer-circle {
    fill: none;
    stroke: none;
  }

  .timer-path {
    display: ${(props) => (props.show ? 'block' : 'none')};
    fill: none;
    stroke: #d66258;
    stroke-width: 6px;
    stroke-linecap: round;
    transition: 1s linear all;
    transform: rotate(270deg);
    transform-origin: center;
  }

  .notification-timer-path {
    display: ${(props) => (props.visible ? 'block' : 'none')};
    fill: none;
    stroke: #26953e;
    stroke-width: 6px;
    stroke-linecap: round;
    transition: 1s linear all;
    transform: rotate(270deg);
    transform-origin: center;
  }

  .timer-circle-base {
    fill: #f2e7da;
    stroke: #efefef;
    stroke-width: 5px;
  }

  .timer-svg {
    transform: scaleX(1);
    filter: drop-shadow(7px 7px 3px rgba(0, 0, 0, 0.25));
  }
`;

const TimerLabel = styled.div`
  position: absolute;
  top: 0;
  width: ${(props) => (props.isMobile ? '30rem' : '37.5rem')};
  height: ${(props) => (props.isMobile ? '30rem' : '37.5rem')};
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h1 {
    color: #d66258;
    font-size: ${(props) => (props.isMobile ? '2.5rem' : '3.2rem')};
    margin-bottom: 0.5rem;
  }

  > span {
    color: #d66258;
    font-size: ${(props) => (props.isMobile ? '5.5rem' : '6.9rem')};
    font-weight: 700;
    margin-bottom: 1rem;
  }

  svg {
    width: ${(props) => (props.isMobile ? '2.5rem' : '3.2rem')};
    height: ${(props) => (props.isMobile ? '2.5rem' : '3.2rem')};

    :nth-child(1) {
      fill-opacity: ${(props) => (props.pomoCount < 1 ? 0.3 : 1)};
    }
    :nth-child(2) {
      fill-opacity: ${(props) => (props.pomoCount < 2 ? 0.3 : 1)};
    }
    :nth-child(3) {
      fill-opacity: ${(props) => (props.pomoCount < 3 ? 0.3 : 1)};
    }
    :nth-child(4) {
      fill-opacity: ${(props) => (props.pomoCount < 4 ? 0.3 : 1)};
    }
  }
`;

const Notification = styled.div`
  position: absolute;
  top: 0;
  width: ${(props) => (props.isMobile ? '30rem' : '37.5rem')};
  height: ${(props) => (props.isMobile ? '30rem' : '37.5rem')};
  display: ${(props) => (props.visible ? 'block' : 'none')};

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    font-size: ${(props) => (props.isMobile ? '2rem' : '2.5rem')};
    font-weight: 700;
    background-color: transparent;
    border: none;
  }

  h1 {
    color: #d66258;
    font-size: ${(props) => (props.isMobile ? '2.5rem' : '3.2rem')};
    margin-bottom: 0.5rem;
    text-align: center;
  }

  span {
    color: #d66258;
    font-size: ${(props) => (props.isMobile ? '5.5rem' : '6.9rem')};
    font-weight: 700;
    margin-bottom: 1rem;
  }
`;

const Timer = ({
  time,
  start,
  isVisible,
  timerDasharray,
  noticeDasharray,
  pomoCount,
  noticeTime,
  startBreakTimer,
  isMobile,
}) => {
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  return (
    <Wrapper show={start} visible={!isVisible} isMobile={isMobile}>
      <svg
        className="timer-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="timer-circle">
          <path
            className="timer-circle-base"
            d="M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0"
          ></path>
          <circle
            className="timer-path"
            strokeDasharray={timerDasharray}
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <circle
            className="notification-timer-path"
            strokeDasharray={noticeDasharray}
            cx="50"
            cy="50"
            r="45"
          ></circle>
        </g>
      </svg>

      <TimerLabel pomoCount={pomoCount} visible={isVisible} isMobile={isMobile}>
        <h1>남은 시간</h1>
        <span>{formatTime(time)}</span>
        <div>
          <Tomato></Tomato>
          <Tomato></Tomato>
          <Tomato></Tomato>
          <Tomato></Tomato>
        </div>
      </TimerLabel>

      <Notification visible={!isVisible} isMobile={isMobile}>
        <button onClick={startBreakTimer}>
          <h1>
            휴식시간입니다!
            <br />
            버튼을 눌러주세요!
          </h1>
          <span>{noticeTime}</span>
          <h1>휴식하기</h1>
        </button>
      </Notification>
    </Wrapper>
  );
};

export default Timer;
