import React from 'react';
import styled from 'styled-components';
import logo from '../../images/original.svg';
import { Link } from 'react-router-dom';

const Head = styled.header`
  background-color: var(--color-background);
  max-width: 1320px;
  width: 100vw;
  height: 7rem;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 100;

  > div {
    margin: 1.5rem 2rem;
  }

  img {
    height: 4rem;
  }
`;

const HeaderMobile = () => {
  return (
    <Head>
      <div>
        <Link to="/">
          <img src={logo} alt="logo"></img>
        </Link>
      </div>
    </Head>
  );
};

export default HeaderMobile;
