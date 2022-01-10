import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Star1 } from '../../images/starOne.svg';
import { ReactComponent as Star2 } from '../../images/starTwo.svg';
import { ReactComponent as Star3 } from '../../images/starThree.svg';

export const RankContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 0 25px;
  height: 45px;
  font-size: 18px;
`;

const RanknName = styled.div`
  display: flex;
  align-items: center;
`;

const Ranking = styled.div`
  color: #c16b3f;
  font-weight: bold;
  margin-right: 50px;
`;

const StyledStar = styled.div`
  margin-right: 50px;
  margin-left: -17px;
`;

const Name = styled.div`
  margin-left: ${({ topThree }) => topThree};
`;

const Rank = ({ rank, nickname, score }) => {
  return (
    <RankContainer backgroundColor={rank % 2 === 0 ? '#F7F2ED' : '#FAFAFA'}>
      <RanknName>
        {rank === 1 && (
          <StyledStar>
            <Star1 width="45px" />
          </StyledStar>
        )}
        {rank === 2 && (
          <StyledStar>
            <Star2 width="45px" />
          </StyledStar>
        )}
        {rank === 3 && (
          <StyledStar>
            <Star3 width="45px" />
          </StyledStar>
        )}
        {rank > 3 && <Ranking>{rank}</Ranking>}
        <Name topThree={rank <= 3 ? '-17px' : '0px'}>{nickname}</Name>
      </RanknName>
      <div>{score}&nbsp;&nbsp;뽀모</div>
    </RankContainer>
  );
};

export default Rank;
