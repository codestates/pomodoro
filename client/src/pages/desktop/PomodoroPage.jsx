import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { UserContext } from '../../App';
import Timer from '../../components/desktop/Timer';
import TimerButton from '../../components/desktop/TimerButton';

const MainWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: ${(props) => (props.isMobile ? '14rem' : '8rem')};
  margin-bottom: 10rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PomodoroPage = ({ isMobile }) => {
  const POMODORO_TIME = 8;
  const BREAKE_TIME = 6;
  const NOTICE_TIME = 5;
  const CIRCLE_DASHARRAY = '0 283';
  const POMODORO_API = 'https://final.eax.kr/api/pomodoro';

  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [time, setTime] = useState(POMODORO_TIME);
  const [noticeTime, setNoticeTime] = useState(NOTICE_TIME);
  const [pomoCount, setPomoCount] = useState(0);
  const [start, setStart] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [timerDasharray, setTimerDasharray] = useState(CIRCLE_DASHARRAY);
  const [noticeDasharray, setNoticeDasharray] = useState(CIRCLE_DASHARRAY);
  const [startTimerInterval, setStartTimerInterval] = useState(null);
  const [noticeTimerInterval, setNoticeTimerInterval] = useState(null);

  const clearTimer = () => {
    const breakTime = pomoCount === 3 ? BREAKE_TIME * 3 : BREAKE_TIME;

    setStart(false);
    setTime(breakTime);
    setIsVisible(false);
    setTimerDasharray(CIRCLE_DASHARRAY);
  };

  const clearNotice = () => {
    setIsVisible(true);
    setNoticeTime(NOTICE_TIME);
    setNoticeDasharray(CIRCLE_DASHARRAY);
  };

  const startTimer = () => {
    let timerInterval = null;
    let timePassed = 0;
    let timeLeft = time;
    setStart(true);
    setShowExit(true);
    setShowButton(false);
    sendPomodoroBeginning();

    timerInterval = setInterval(() => {
      timePassed += 1;
      timeLeft = time - timePassed;

      if (timeLeft === -1) {
        clearTimeout(timerInterval);
        setShowExit(false);
        clearTimer();
        noticeBreakTime();
        return;
      }

      setTime(timeLeft);
      setTimerDasharray(`${((timePassed / time) * 283).toFixed(0)} 283`);
    }, 1000);

    setStartTimerInterval(timerInterval);
  };

  const noticeBreakTime = () => {
    let timerInterval = null;
    let timePassed = 0;
    let timeLeft = noticeTime;

    timerInterval = setInterval(() => {
      timePassed += 1;
      timeLeft = noticeTime - timePassed;

      if (timeLeft === -1) {
        clearTimeout(timerInterval);
        clearNotice();
        setShowButton(true);
        setTime(POMODORO_TIME);
        setStart(false);
        return;
      }

      setNoticeTime(timeLeft);
      setNoticeDasharray(`${((timePassed / noticeTime) * 283).toFixed(0)} 283`);
    }, 1000);

    setNoticeTimerInterval(timerInterval);
  };

  const startBreakTimer = () => {
    let timerInterval = null;
    let timePassed = 0;
    let timeLeft = time;
    setStart(true);
    clearNotice();
    setPomoCount(pomoCount + 1);
    clearTimeout(noticeTimerInterval);
    sendPomodoroEndding();

    timerInterval = setInterval(() => {
      timePassed += 1;
      timeLeft = time - timePassed;

      if (timeLeft === -1) {
        if (pomoCount === 3) setPomoCount(0);
        setTime(POMODORO_TIME);
        setStart(false);
        setIsVisible(true);
        setShowButton(true);
        setTimerDasharray(CIRCLE_DASHARRAY);
        clearTimeout(timerInterval);
        return;
      }

      setTime(timeLeft);
      setTimerDasharray(`${((timePassed / time) * 283).toFixed(0)} 283`);
    }, 1000);
  };

  const exitPomodoro = () => {
    clearTimeout(startTimerInterval);
    clearTimeout(noticeTimerInterval);
    navigate('/music');
  };

  const sendPomodoroBeginning = () => {
    if (userInfo) {
      const token = localStorage.getItem('Token');
      const headers = {
        authorization: `Bearer ${token}`,
      };

      axios.post(POMODORO_API, {}, { headers }).catch((err) => {
        console.log(err);
      });
    }
  };

  const sendPomodoroEndding = () => {
    if (userInfo) {
      const token = localStorage.getItem('Token');
      const headers = {
        authorization: `Bearer ${token}`,
      };

      axios.patch(POMODORO_API, {}, { headers }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <MainWrapper isMobile={isMobile}>
      <Timer
        time={time}
        start={start}
        isVisible={isVisible}
        timerDasharray={timerDasharray}
        noticeDasharray={noticeDasharray}
        pomoCount={pomoCount}
        noticeTime={noticeTime}
        startBreakTimer={startBreakTimer}
        isMobile={isMobile}
      />

      <TimerButton
        showExit={showExit}
        showButton={showButton}
        timerDasharray={timerDasharray}
        startTimer={startTimer}
        exitPomodoro={exitPomodoro}
        isMobile={isMobile}
      />
    </MainWrapper>
  );
};

export default PomodoroPage;
