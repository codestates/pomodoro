import React from 'react';
import styled from 'styled-components';
import Header from '../../components/desktop/Header';
import Footer from '../../components/desktop/Footer';
import Rank from '../../components/desktop/Rank';
import MyRank from '../../components/desktop/MyRank';

import rankingData from '../../dummyData/ranking';
const userInfo = { nickname: '포모', rank: 100, pomo: 1 };

const Container = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RankingSection = styled.section`
  width: 55%;
  height: 500px;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 35px;
  letter-spacing: 0.1em;
  margin-bottom: 40px;
`;

const TopTwentyContainer = styled.div`
  height: 375px;
  border-radius: 5px;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const TopTwenty = styled.ol`
  background-color: #f2e7da;
  padding: 10px;
`;

const Ranking = () => {
  return (
    <>
      <Header />
      <Container>
        <RankingSection>
          <Title>랭킹</Title>
          <MyRank
            rank={userInfo.rank}
            nickname={userInfo.nickname}
            pomo={userInfo.pomo}
          />
          <TopTwentyContainer>
            <TopTwenty>
              {rankingData.map((item) => (
                <Rank
                  key={item.rank}
                  rank={item.rank}
                  nickname={item.nickname}
                  score={item.score}
                  pomo={item.pomo}
                />
              ))}
            </TopTwenty>
          </TopTwentyContainer>
        </RankingSection>
      </Container>
      <Footer />
    </>
  );
};

export default Ranking;
