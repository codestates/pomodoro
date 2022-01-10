import React, { useState } from 'react';
import { ReactComponent as Home } from '../../images/home.svg';
import { ReactComponent as Clock } from '../../images/clock.svg';
import { ReactComponent as Ranking } from '../../images/rank.svg';
import { ReactComponent as SignIn } from '../../images/signIn.svg';
import { ReactComponent as SignUp } from '../../images/signUp.svg';
import { ReactComponent as SignOut } from '../../images/signOut.svg';
import { ReactComponent as MyPage } from '../../images/myPage.svg';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  max-width: 1320px;
  height: 10rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 50%;
  bottom: 0;
  padding: 0 1rem;
  transform: translate(-50%, 0);

  button {
    display: flex;
    flex-direction: column;
    background-color: transparent;
    border: none;

    svg {
      width: 4.5rem;
      height: 4.5rem;
      margin: 0 auto;
    }
  }
`;

const Span = styled.span`
  width: 100%;
  margin-top: 0.5rem;
  font-weight: 700;
  font-size: 1.3rem;
  text-align: center;
  color: ${(props) => (props.selected ? '#9E150C' : 'black')};
  opacity: 0.6;
`;

const TabBarMobile = ({ isLogin }) => {
  const [selected, setSelected] = useState(1);

  return (
    <Nav>
      <button onClick={() => setSelected(1)}>
        <Home fill={selected === 1 ? '#9E150C' : 'black'}></Home>
        <Span selected={selected === 1}>Home</Span>
      </button>
      <button onClick={() => setSelected(2)}>
        <Clock fill={selected === 2 ? '#9E150C' : 'black'}></Clock>
        <Span selected={selected === 2}>Pomodoro</Span>
      </button>
      <button onClick={() => setSelected(3)}>
        <Ranking fill={selected === 3 ? '#9E150C' : 'black'}></Ranking>
        <Span selected={selected === 3}>Ranking</Span>
      </button>
      {isLogin ? (
        <>
          <button onClick={() => setSelected(4)}>
            <MyPage fill={selected === 4 ? '#9E150C' : 'black'}></MyPage>
            <Span selected={selected === 4}>My page</Span>
          </button>
          <button onClick={() => setSelected(5)}>
            <SignOut fill={selected === 5 ? '#9E150C' : 'black'}></SignOut>
            <Span selected={selected === 5}>Sign out</Span>
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setSelected(4)}>
            <SignIn fill={selected === 4 ? '#9E150C' : 'black'}></SignIn>
            <Span selected={selected === 4}>Sign in</Span>
          </button>
          <button onClick={() => setSelected(5)}>
            <SignUp fill={selected === 5 ? '#9E150C' : 'black'}></SignUp>
            <Span selected={selected === 5}>Sign up</Span>
          </button>
        </>
      )}
    </Nav>
  );
};

export default TabBarMobile;
