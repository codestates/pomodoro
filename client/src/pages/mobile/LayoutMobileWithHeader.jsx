import React from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import HeaderMobile from '../../components/mobile/HeaderMobile';

const Main = styled.main`
  margin: 7rem 0;
`;

const LayoutMobileWithHeader = () => {
  return (
    <>
      <HeaderMobile />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default LayoutMobileWithHeader;
