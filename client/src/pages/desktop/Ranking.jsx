import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Rank from '../../components/desktop/Rank';
import MyRank from '../../components/desktop/MyRank';
import axios from 'axios';

require('dotenv').config();
const SERVER_ENDPOINT = process.env.ENDPOINT || 'https://final.eax.kr';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;

  @media screen and (max-width: 900px) {
    height: auto;
    margin-top: 70px;
  }
`;

const RankingSection = styled.section`
  position: relative;
  width: 900px;
  height: 500px;

  @media screen and (max-width: 900px) {
    width: 90%;
    height: auto;
    z-index: -100;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 4.5rem;
  letter-spacing: 0.1em;
  margin-bottom: 30px;

  @media screen and (max-width: 900px) {
    font-size: 3rem;
    margin: 20px 0 30px;
  }
`;

const TopTwentyContainer = styled.div`
  background-color: #f2e7da;
  height: 375px;
  border-radius: 5px;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  @media screen and (max-width: 900px) {
    overflow-y: hidden;
    height: auto;
    margin-bottom: 80px;
  }
`;

const TopTwenty = styled.ol`
  background-color: #f2e7da;
  height: 100%;
  padding: 10px;
`;

const Ranking = () => {
  const [rankingList, setRankingList] = useState([]);
  const token = localStorage.getItem('Token');

  useEffect(() => {
    axios
      .get(`${SERVER_ENDPOINT}/api/ranks`)
      .then((res) => {
        setRankingList(res.data.result);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <RankingSection>
        <Title>랭킹</Title>
        {token ? <MyRank /> : <></>}
        <TopTwentyContainer>
          <TopTwenty>
            {rankingList.map((item) => (
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
  );
};

export default Ranking;
