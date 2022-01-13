import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../images/original.svg';

const Head = styled.header`
  max-width: 1320px;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  > nav {
    display: flex;
    align-items: center;

    > div {
      margin: 0 2rem;
    }

    img {
      height: 5rem;
    }

    a {
      font-size: 2.4rem;
      font-family: 'Poppins', sans-serif;
      white-space: nowrap;
    }
  }

  > div {
    display: flex;
  }

  button {
    border: 1px solid #666666;
    border-radius: 1rem;
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    padding: 0.5rem 2.5rem;
    margin: 0 1.5rem;
    white-space: nowrap;
    background-color: none;
    box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.35);

    &.navy {
      color: #ffffff;
      background-color: #111032;
    }
  }
`;

const Header = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('Token'));

  const signOut = () => {
    localStorage.removeItem('Token');
    setIsLogin(false);
  };

  return (
    <Head>
      <nav>
        <div>
          <Link to="/">
            <img src={logo} alt="logo"></img>
          </Link>
        </div>
        <div>
          <Link to="/music">Let's start!</Link>
        </div>
        <div>
          <Link to="/ranking">Ranking</Link>
        </div>
      </nav>
      {isLogin ? (
        <div>
          <Link to="/mypage">
            <button>My page</button>
          </Link>
          <button className="navy" onClick={signOut}>
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>Sign in</button>
          </Link>
          <Link to="/signup">
            <button className="navy">Sign up</button>
          </Link>
        </div>
      )}
    </Head>
  );
};

export default Header;
