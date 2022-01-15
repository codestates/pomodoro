import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  &.timer {
    position: relative;
    height: 300px;
    width: 300px;
  }

  .timer-circle {
    fill: none;
    stroke: none;
  }

  .timer-path {
    fill: #f2e7da;
    stroke: #d66258;
    stroke-width: 5px;
  }

  .timer-label {
    position: absolute;
    top: 0;
    width: 30rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > h1 {
      color: #d66258;
      font-size: 3rem;
    }

    > span {
      color: #d66258;
      font-size: 5rem;
      font-weight: 700;
    }
  }

  .timer-path-remaining {
    stroke-width: 6px;
    transition: 1s linear all;
    stroke: #efefef;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
  }

  .timer-svg {
    transform: scaleX(1);
    -webkit-filter: drop-shadow(7px 7px 3px rgba(0, 0, 0, 0.25));
    filter: drop-shadow(7px 7px 3px rgba(0, 0, 0, 0.25));
  }
`;

const Timer = () => {
  const [time, setTime] = useState(10);
  const [circleDasharray, setCircleDasharray] = useState(283);

  const startTimer = () => {
    let timerInterval = null;
    let timePassed = 0;
    let timeLeft = time;

    timerInterval = setInterval(() => {
      timePassed += 1;
      timeLeft = time - timePassed;

      setCircleDasharray(`${((timeLeft / time) * 283).toFixed(0)} 283`);
      if (timeLeft === -1) return clearTimeout(timerInterval);
      setTime(timeLeft);
    }, 1000);
  };

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
    <>
      <Wrapper className="timer">
        <svg
          className="timer-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="timer-circle">
            <circle className="timer-path" cx="50" cy="50" r="45"></circle>
            <path
              id="timer-path-remaining"
              stroke-dasharray={circleDasharray}
              className="timer-path-remaining"
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <div className="timer-label">
          <h1>남은 시간</h1>
          <span>{formatTime(time)}</span>
        </div>
      </Wrapper>
      <button onClick={startTimer}>start</button>
    </>
  );
};

export default Timer;
