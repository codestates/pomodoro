import React from 'react';
import styled from 'styled-components';
import github from '../../images/github.svg';

const Foot = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  max-width: 1320px;
  padding: 0.75rem 0;
  margin: 0 auto;

  > a {
    width: 11.5rem;
    /* margin: 0 5.25rem; */
    display: flex;
    justify-content: space-around;
  }

  img {
    width: 3.5rem;
    height: 3.5rem;
  }

  li {
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
    margin: 0;
    padding: 0;

    :first-child {
      font-size: 2.2rem;
    }
  }

  > div {
    /* margin: 0 5.25rem; */
    font-size: 1.4rem;
    font-family: 'Poppins', sans-serif;
  }
`;

const Footer = () => {
  return (
    <Foot>
      <a href="https://github.com/krim45">
        <img src={github}></img>
        <ul>
          <li>김경봉</li>
          <li>front-end</li>
        </ul>
      </a>
      <a href="https://github.com/kaehehehe">
        <img src={github}></img>
        <ul>
          <li>카에</li>
          <li>front-end</li>
        </ul>
      </a>
      <a href="https://github.com/exxocism">
        <img src={github}></img>
        <ul>
          <li>최민우</li>
          <li>full-stack</li>
        </ul>
      </a>
      <a href="https://github.com/AbyulStudy">
        <img src={github}></img>
        <ul>
          <li>최민석</li>
          <li>back-end</li>
        </ul>
      </a>
      <div>©2022 Buglife</div>
    </Foot>
  );
};

export default Footer;
