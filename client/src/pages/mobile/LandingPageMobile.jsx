import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';
import img5 from '../../images/img5.png';
import img6 from '../../images/img6.png';
import ScrollToTop from '../../components/desktop/ScrollToTop';

const Wrapper = styled.div`
  max-width: 1320px;
  padding: 1.5rem 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 60%;
  padding: 1.5rem 0;

  &.img6 {
    width: 50%;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContent = styled.h1`
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 3rem;

  &.line-height {
    margin-top: 3rem;
    margin-bottom: 4rem;
    line-height: 7rem;
  }

  &.no-margin {
    margin-bottom: 0;
  }

  &.last-text {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    line-height: 3rem;
    margin-bottom: 3rem;
  }
`;

const TextContent = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 5rem;
  padding: 0 4rem;
  margin-bottom: 5rem;
  text-align: center;
`;

const StartButton = styled.button`
  background-color: #f57270;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  padding: 2rem 4rem;
  border-radius: 50px;
  text-align: center;
`;

const LandingPageMobile = () => {
  return (
    <Wrapper>
      <Section>
        <ImgContainer>
          <Img src={img1} alt="landing img1"></Img>
        </ImgContainer>
        <TextContainer>
          <TitleContent>집중하고 계신가요?</TitleContent>
          <TextContent>
            COVID-19으로 재택근무자와 취준생이 늘었습니다.
            <br />
            하지만 휴식의 공간인 집에서 휴식 외의 일을 한다는 건 강한 의지를
            요구하는 일입니다.
            <br />
            집중을 도와줄 Pomodoro 사용해보세요!
            <br />
          </TextContent>
        </TextContainer>
      </Section>

      <Section>
        <ImgContainer>
          <Img src={img2} alt="landing img2"></Img>
        </ImgContainer>
        <TextContainer>
          <TitleContent className="line-height no-margin">
            25분 집중
            <br />
            5분 휴식
          </TitleContent>
          <TextContent>
            뽀모도로 기법은 시간 관리 방법론으로,
            <br />
            타이머를 이용해서 25분간 집중해서 일을 한 다음 5분간 휴식하는
            방식입니다.
            <br />
            {'(Pomodoro, 이탈리아어로 토마토를 의미)'}
          </TextContent>
        </TextContainer>
      </Section>

      <Section>
        <ImgContainer>
          <Img src={img3} alt="landing img3"></Img>
        </ImgContainer>
        <TextContainer>
          <TitleContent className="line-height">
            뽀모도로로
            <br />
            시간을
            <br />
            관리해보세요
          </TitleContent>
        </TextContainer>
      </Section>

      <Section>
        <ImgContainer>
          <Img src={img4} alt="landing img4"></Img>
        </ImgContainer>
        <TextContainer>
          <TitleContent className="line-height">
            Youtube와 함께
            <br />
            원하는 음악으로
          </TitleContent>
        </TextContainer>
      </Section>

      <Section>
        <ImgContainer>
          <Img src={img5} alt="landing img5"></Img>
        </ImgContainer>
        <TextContainer>
          <TitleContent className="line-height">
            랭킹을 통해
            <br />
            다른 유저와
            <br />
            경쟁도 가능해요
          </TitleContent>
        </TextContainer>
      </Section>

      <Section>
        <ImgContainer>
          <Img className="img6" src={img6} alt="landing img6"></Img>
        </ImgContainer>
        <TextContainer>
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
      </Section>
      <ScrollToTop isMobile={true} />
    </Wrapper>
  );
};

export default LandingPageMobile;
