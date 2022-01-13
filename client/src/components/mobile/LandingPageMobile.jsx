import React from 'react';
import styled from 'styled-components';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';
import img5 from '../../images/img5.png';
import img6 from '../../images/img6.png';

const Wrapper = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  margin-top: 7.5rem;
  margin-bottom: 10rem;
  padding: 2rem;

  div {
    display: grid;
    align-content: center;

    img {
      width: 80%;
      margin: 0 auto;
      padding: 3rem 7rem;

      &.landing-6 {
        /* padding: 3rem 0; */
      }
    }

    h1 {
      text-align: center;
      font-size: 3rem;
      margin-bottom: 3rem;

      &.line-height {
        margin-top: 3rem;
        margin-bottom: 4rem;
        line-height: 7rem;
      }

      &.no-margin {
        margin-bottom: 0;
      }
    }

    p {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 5rem;
      margin-bottom: 5rem;
      text-align: center;
    }

    div.text {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      line-height: 5rem;
      margin-bottom: 3rem;
    }
  }

  button {
    margin: 0 auto;
    background-color: #f57270;
    border: none;
    color: #ffffff;
    font-size: 2.5rem;
    font-weight: 700;
    padding: 2.5rem 4.5rem;
    border-radius: 50px;
    text-align: center;
  }
`;

const LandingPageMobile = () => {
  return (
    <Wrapper>
      <div>
        <div>
          <img src={img1} alt="landing img 1"></img>
        </div>
        <div>
          <h1>집중하고 계신가요?</h1>
          <p>
            COVID-19으로 재택근무자와 취준생이 늘었습니다.
            <br />
            하지만 휴식의 공간인 집에서 휴식 외의 일을 한다는 건 강한 의지를
            요구하는 일입니다.
            <br />
            집중을 도와줄 Pomodoro 사용해보세요!
            <br />
          </p>
        </div>
      </div>

      <div>
        <div>
          <img src={img2} alt="landing img 2"></img>
        </div>
        <div>
          <h1 className="line-height no-margin">
            25분 집중
            <br />
            5분 휴식
          </h1>
          <p>
            뽀모도로 기법은 시간 관리 방법론으로,
            <br />
            타이머를 이용해서 25분간 집중해서 일을 한 다음 5분간 휴식하는
            방식입니다.
            <br />
            {'(Pomodoro, 이탈리아어로 토마토를 의미)'}
          </p>
        </div>
      </div>

      <div>
        <div>
          <img src={img3} alt="landing img 3"></img>
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
          <img src={img4} alt="landing img 4"></img>
        </div>
        <div>
          <h1 className="line-height">
            Youtube와 함께
            <br />
            원하는 음악으로
          </h1>
        </div>
      </div>

      <div>
        <div>
          <img src={img5} alt="landing img 5"></img>
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
        <div>
          <img className="landing-6" src={img6} alt="landing img 6"></img>
        </div>
        <div>
          <div className="text">
            뽀모도로를 이용해
            <br />
            나만의 플레이리스트를
            <br />
            완성하세요.
          </div>
          <div className="text">
            모바일과 데스크톱 모두
            <br />
            편리하게 사용이 가능합니다.
          </div>
          <div>
            <button>지금 체험하러 가기</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LandingPageMobile;
