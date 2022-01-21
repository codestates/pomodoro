import React from 'react';
import styled from 'styled-components';
import tomato from '../../images/tomatoGlow.svg';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.192);
  z-index: 999;

  div {
    display: flex;
    justify-content: center;
  }

  img {
    animation: rotating 2s linear infinite;

    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

const Loading = () => {
  return (
    <Wrapper>
      <div>
        <img src={tomato} alt="loading tomato"></img>
      </div>
    </Wrapper>
  );
};

export default Loading;
