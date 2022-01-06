import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../images/original.svg';

const Head = styled.header`
  max-width: 1320px;
  height: 10rem;
  display: flex;
  align-items: center;
  margin: 0 auto;

  > img {
    /* width: 25rem; */
    height: 5rem;
    padding: 0 4rem;
  }

  > nav {
    display: flex;

    div {
      font-size: 2.4rem;
      font-family: 'Poppins', sans-serif;
      padding: 0 2.175rem;
    }
  }

  > div {
    flex: 7 0 0;

    > div {
      display: flex;
      justify-content: right;
    }

    button {
      border: 1px solid #666666;
      border-radius: 1rem;
      font-family: 'Poppins', sans-serif;
      font-size: 2rem;
      padding: 0.5rem 2.5rem;
      margin: 0 2.075rem;

      :first-child {
        background-color: none;
      }

      :nth-child(2) {
        color: #ffffff;
        background-color: #111032;
      }
    }
  }
`;

const Header = ({ isLogin = false }) => {
  return (
    <Head>
      <img src={logo} alt="logo"></img>
      <nav>
        <div>Let's start!</div>
        <div>Ranking</div>
      </nav>
      <div>
        {isLogin ? (
          <div>
            <button>My page</button>
            <button>Sign out</button>
          </div>
        ) : (
          <div>
            <button>Sign in</button>
            <button>Sign up</button>
          </div>
        )}
      </div>
    </Head>
  );
};

export default Header;
