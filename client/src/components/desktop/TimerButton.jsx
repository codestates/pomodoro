import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as TomatoPlay } from '../../images/TomatoPlay.svg';
import YesOrNoModal from '../../components/desktop/YesOrNoModal';

const StartWrapper = styled.div`
  display: ${(props) => (props.showButton ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  button {
    width: ${(props) => (props.isMobile ? '6rem' : '8rem')};
    border: none;
    background-color: transparent;
    border-radius: 50%;
  }

  svg {
    width: 100%;
    height: 100%;

    :hover rect {
      fill-opacity: 1;
    }
  }
`;

const ExitWrapper = styled.div`
  display: ${(props) => (props.exit ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  button {
    width: ${(props) => (props.isMobile ? '6rem' : '8rem')};
    border: none;
    background-color: transparent;
    border-radius: 50%;
  }

  svg {
    width: ${(props) => (props.isMobile ? '6rem' : '8rem')};
    height: ${(props) => (props.isMobile ? '6rem' : '8rem')};
  }
`;

const ButtonWrapper = styled.div`
  height: 10rem;
  margin: ${(props) => (props.isMobile ? '4rem 0' : '5rem 0')};
`;

const TimerButton = ({
  showButton,
  startTimer,
  showExit,
  timerDasharray,
  exitPomodoro,
  isMobile,
}) => {
  const [isModal, setIsMotal] = useState(false);

  return (
    <ButtonWrapper>
      <StartWrapper showButton={showButton} isMobile={isMobile}>
        <button onClick={startTimer}>
          <TomatoPlay />
        </button>
      </StartWrapper>
      <ExitWrapper exit={showExit} isMobile={isMobile}>
        <button onClick={() => setIsMotal(true)}>
          <svg
            width="142"
            height="159"
            viewBox="0 0 142 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="grad1"
                x1="0%"
                y1="100%"
                x2="0%"
                y2={`${100 - (timerDasharray.split(' ')[0] / 283) * 200}%`}
              >
                <stop offset="0%" stopColor="#d66258" stopOpacity="1" />
                <stop offset="100%" stopColor="#1C5907" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M105.526 40.1525C100.696 41.9867 95.6851 42.6999 89.8216 42.165C98.6556 48.3808 102.014 56.2014 100.386 66.5696C99.6371 65.7289 99.2238 65.2704 98.8105 64.7864C96.0467 61.602 92.7662 59.3603 88.5817 58.2139C83.0282 56.6855 78.5337 53.4502 75.1757 48.7884C74.4008 47.7184 73.8067 47.9986 73.2643 48.9922C72.4893 50.4442 71.7144 51.8962 70.9395 53.3738C68.279 58.4687 64.1719 61.2199 58.2568 61.2963C55.7254 61.3473 53.194 61.6275 50.6626 61.9587C49.5519 62.1115 49.2161 62.0096 49.4486 60.8123C49.9135 58.3668 50.8951 56.1505 52.1866 54.0616C53.5556 51.8708 55.2346 49.8583 56.2937 47.4892C56.7844 46.4447 57.1977 45.3748 57.2236 44.2029C57.3269 41.2224 56.7069 40.6875 53.8139 41.2479C48.2604 42.3178 42.836 41.9357 37.6699 39.5411C36.4559 38.5985 34.9836 37.9872 34.0278 36.7134C34.8802 35.8473 35.836 36.2804 36.6625 36.637C41.4412 38.7259 46.0131 37.9617 50.5593 35.9237C56.9653 33.0706 63.6037 32.0006 70.5262 33.7584C72.541 34.2679 72.1277 33.0196 71.8952 31.9497C70.5521 26.1415 69.1056 20.3588 67.7365 14.5761C67.4266 13.2514 67.0133 11.9267 66.9616 10.5511C66.8583 7.82532 68.9247 5.91473 71.327 6.42422C72.696 11.6974 74.1167 16.9707 75.3823 22.2694C75.744 23.8233 76.2348 24.129 77.8362 23.7214C82.7957 22.4477 87.471 23.7724 92.0171 25.7339C93.9544 26.5746 95.8659 27.4407 97.7515 28.3578C103.563 31.16 109.608 31.4657 115.833 29.9372C116.608 29.7589 117.383 29.5296 118.158 29.3258C118.209 29.3003 118.287 29.3768 118.597 29.4787C115.006 34.0641 110.951 37.9107 105.526 40.1525Z"
              fill="#92C23B"
            />
            <path
              d="M71.3529 6.45052C68.3308 6.98549 67.1167 8.66681 67.7883 11.5454C69.4156 18.7802 71.0688 25.9895 72.7736 33.1988C73.1094 34.5999 73.1352 35.0839 71.4562 34.5999C63.9138 32.4091 56.7587 33.7847 49.7329 36.8926C45.9358 38.5739 41.9321 39.3891 37.7992 37.6059C36.6368 37.1219 35.4228 36.485 34.0538 36.6888C31.5999 34.982 29.8176 32.6893 27.8545 30.1418C29.8693 30.1673 31.3674 30.7787 32.8398 31.3391C36.2752 32.6383 39.6332 32.511 43.0428 31.2627C46.5041 29.989 49.8878 28.435 53.5299 27.6453C58.4119 26.5754 63.1905 27.1868 68.2274 28.8681C66.9617 23.4675 65.7477 18.3471 64.5337 13.2267C63.9396 10.7048 63.2938 8.20827 62.7256 5.71176C62.1056 2.96051 63.3455 0.667806 65.7477 0.107366C67.9433 -0.427599 70.0614 1.0754 70.8105 3.75022C71.0946 4.61636 71.1979 5.53344 71.3529 6.45052Z"
              fill="#92C23B"
            />
            <path
              d="M105.527 40.1525C114.051 44.4068 121.464 50.0621 127.612 57.3478C132.778 63.4872 136.549 70.3144 139.235 77.8294C142.077 85.8029 142.438 94.0821 141.612 102.234C140.398 113.927 135.516 124.32 127.844 133.415C121.206 141.286 113.172 147.273 103.899 151.705C98.7074 154.177 93.2314 155.985 87.652 157.284C79.4121 159.195 70.9139 159.348 62.6223 158.533C49.268 157.208 36.8952 152.623 26.0206 144.675C18.1423 138.917 11.5814 131.861 6.98359 123.301C2.64408 115.226 0.164356 106.641 0.00937361 97.2919C-0.145609 87.4587 1.61086 78.186 6.05369 69.4482C10.8065 60.0991 17.6774 52.4822 26.1498 46.2409C29.7402 43.5916 33.5373 41.2225 37.7476 39.5666C38.4192 39.159 39.0133 39.4902 39.6074 39.7195C44.4635 41.6555 49.423 41.4772 54.4341 40.5347C56.7072 40.1016 57.2754 40.4328 57.7662 42.6236C58.1278 44.1775 57.7404 45.6041 57.1463 47.0307C56.1131 49.4253 54.6407 51.5651 53.1426 53.6795C51.7994 55.5901 50.8695 57.679 50.2754 59.9208C50.0687 60.7359 50.0687 61.2964 51.2569 61.22C54.3049 61.0416 57.3529 60.736 60.3751 60.4812C64.9212 60.0991 67.9434 57.4243 70.139 53.705C70.9397 52.3548 71.5597 50.8773 72.3346 49.4762C73.5744 47.2854 74.401 47.1835 76.0283 49.0941C79.5154 53.2464 83.7258 56.3543 89.021 57.7809C92.9731 58.8508 96.176 60.8888 98.8108 63.9203C99.0949 64.226 99.3274 64.6081 99.8956 64.7609C100.696 59.8698 100.102 55.2335 97.5451 50.9537C95.9436 48.2789 94.1096 45.8079 91.4232 44.0247C90.8291 43.6425 90.0284 43.1331 90.2351 42.3688C90.4675 41.5791 91.4232 41.6301 92.1207 41.6555C96.3827 41.8338 100.541 41.3498 104.545 39.8468C104.907 39.7704 105.268 39.8468 105.527 40.1525Z"
              fill="url(#grad1)"
            />
            <path
              d="M98.4299 117.583C100.701 119.824 100.701 123.454 98.4299 125.695C97.3035 126.815 95.8137 127.371 94.3239 127.371C92.8341 127.371 91.348 126.811 90.2143 125.69L71.0688 106.809L51.9252 125.686C50.7897 126.815 49.3017 127.371 47.8138 127.371C46.3258 127.371 44.8397 126.815 43.7033 125.686C41.4322 123.445 41.4322 119.815 43.7033 117.574L62.8524 98.6787L43.7033 79.7926C41.4322 77.5517 41.4322 73.9215 43.7033 71.6807C45.9743 69.4398 49.6533 69.4398 51.9243 71.6807L71.0688 90.5846L90.2179 71.6896C92.4889 69.4487 96.168 69.4487 98.439 71.6896C100.71 73.9305 100.71 77.5607 98.439 79.8016L79.2899 98.6966L98.4299 117.583Z"
              fill="white"
            />
            <path
              d="M98.0787 125.339L98.0773 125.34C97.0505 126.361 95.6902 126.871 94.3239 126.871C92.9593 126.871 91.6014 126.358 90.5658 125.334L90.5654 125.334L71.4199 106.453L71.0689 106.106L70.7178 106.453L51.5741 125.33L51.5726 125.331C50.5362 126.362 49.1774 126.871 47.8138 126.871C46.4504 126.871 45.0932 126.362 44.0557 125.331L44.0544 125.33C41.9819 123.285 41.9819 119.975 44.0544 117.93L63.2035 99.0346L63.5643 98.6786L63.2035 98.3227L44.0544 79.4367C41.9819 77.3916 41.9819 74.0816 44.0544 72.0366C46.1307 69.9879 49.4967 69.9878 51.573 72.0364C51.573 72.0365 51.5731 72.0365 51.5731 72.0366L70.7175 90.9404L71.0687 91.2872L71.42 90.9405L90.5691 72.0455C92.6454 69.9968 96.0115 69.9968 98.0878 72.0455C100.16 74.0906 100.16 77.4006 98.0878 79.4457L78.9387 98.3407L78.578 98.6966L78.9387 99.0525L98.0787 117.939C100.151 119.984 100.151 123.294 98.0787 125.339Z"
              stroke="black"
              strokeOpacity="0.5"
            />
          </svg>
        </button>
      </ExitWrapper>
      {isModal ? (
        <YesOrNoModal
          text="타이머를
          종료 하시겠습니까?"
          handleModal={setIsMotal}
          setYes={() => {
            exitPomodoro();
          }}
        />
      ) : null}
    </ButtonWrapper>
  );
};

export default TimerButton;
