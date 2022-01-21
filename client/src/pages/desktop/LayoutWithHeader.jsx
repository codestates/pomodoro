import React from 'react';
import { Outlet } from 'react-router';
import Header from '../../components/desktop/Header';
import Footer from '../../components/desktop/Footer';

const LayoutWithHeader = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutWithHeader;
