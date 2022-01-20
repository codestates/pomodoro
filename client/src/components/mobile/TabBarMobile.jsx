import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Home } from '../../images/home.svg';
import { ReactComponent as Clock } from '../../images/clock.svg';
import { ReactComponent as Ranking } from '../../images/rank.svg';
import { ReactComponent as SignIn } from '../../images/signIn.svg';
import { ReactComponent as SignUp } from '../../images/signUp.svg';
import { ReactComponent as SignOut } from '../../images/signOut.svg';
import { ReactComponent as MyPage } from '../../images/myPage.svg';
import styled from 'styled-components';
import { UserContext } from '../../App';

const Nav = styled.nav`
  background-color: var(--color-background);
  max-width: 1320px;
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 50%;
  bottom: 0;
  padding: 0 1rem;
  transform: translate(-50%, 0);
  z-index: 80;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border: none;

  svg {
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
  }
`;

const Span = styled.span`
  width: 100%;
  margin-top: 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  color: ${(props) => (props.selected ? '#9E150C' : 'black')};
  opacity: 0.6;
`;

const TabBarMobile = () => {
  const { pathname } = useLocation();
  const { userInfo, clearStates } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('Token');
    clearStates();
    navigate('/');
  };

  return (
    <Nav>
      <Link to="/">
        <Button>
          <Home fill={'/' === pathname ? '#9E150C' : 'black'}></Home>
          <Span selected={'/' === pathname}>Home</Span>
        </Button>
      </Link>

      <Link to="/music">
        <Button>
          <Clock
            fill={
              '/music' === pathname || '/pomodoro' === pathname
                ? '#9E150C'
                : 'black'
            }
          ></Clock>
          <Span selected={'/music' === pathname || '/pomodoro' === pathname}>
            Pomodoro
          </Span>
        </Button>
      </Link>

      <Link to="/ranking">
        <Button>
          <Ranking
            fill={'/ranking' === pathname ? '#9E150C' : 'black'}
          ></Ranking>
          <Span selected={'/ranking' === pathname}>Ranking</Span>
        </Button>
      </Link>

      {userInfo ? (
        <>
          <Link to="/mypage">
            <Button>
              <MyPage
                fill={'mypage' === pathname ? '#9E150C' : 'black'}
              ></MyPage>
              <Span selected={'mypage' === pathname}>My page</Span>
            </Button>
          </Link>

          <Button onClick={signOut}>
            <SignOut fill="black"></SignOut>
            <Span>Sign out</Span>
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button>
              <SignIn
                fill={'/login' === pathname ? '#9E150C' : 'black'}
              ></SignIn>
              <Span selected={'/login' === pathname}>Sign in</Span>
            </Button>
          </Link>

          <Link to="/signup">
            <Button>
              <SignUp
                fill={'/signup' === pathname ? '#9E150C' : 'black'}
              ></SignUp>
              <Span selected={'/signup' === pathname}>Sign up</Span>
            </Button>
          </Link>
        </>
      )}
    </Nav>
  );
};

export default TabBarMobile;
