import React from 'react';
import { Outlet } from 'react-router';
import HeaderMobile from '../../components/mobile/HeaderMobile';

const LayoutMobileWithHeader = () => {
  return (
    <>
      <HeaderMobile />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutMobileWithHeader;
