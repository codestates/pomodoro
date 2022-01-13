import React from 'react';
import styled from 'styled-components';
import github from '../../images/github.svg';

const Foot = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  max-width: 1320px;
  padding: 2rem 0;
  margin: 0 auto;
`;

const GithubLink = styled.a`
  width: 9rem;
  display: flex;
  justify-content: space-around;

  li {
    color: #111032;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    margin: 0;
    padding: 0;

    :first-child {
      font-size: 1.5rem;
    }
  }

  > div {
    color: #111032;
    font-size: 1.2rem;
    font-family: 'Poppins', sans-serif;
  }
`;

const Img = styled.img`
  width: 3rem;
  height: 3rem;
  opacity: 0.6;
`;

const Footer = () => {
  return (
    <Foot>
      <GithubLink href="https://github.com/krim45">
        <Img src={github}></Img>
        <ul>
          <li>김경봉</li>
          <li>front-end</li>
        </ul>
      </GithubLink>
      <GithubLink href="https://github.com/kaehehehe">
        <Img src={github}></Img>
        <ul>
          <li>카에</li>
          <li>front-end</li>
        </ul>
      </GithubLink>
      <GithubLink href="https://github.com/exxocism">
        <Img src={github}></Img>
        <ul>
          <li>최민우</li>
          <li>full-stack</li>
        </ul>
      </GithubLink>
      <GithubLink href="https://github.com/AbyulStudy">
        <Img src={github}></Img>
        <ul>
          <li>최민석</li>
          <li>back-end</li>
        </ul>
      </GithubLink>
      <div>©2022 Buglife</div>
    </Foot>
  );
};

export default Footer;
