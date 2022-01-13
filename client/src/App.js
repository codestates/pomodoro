import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import MyPage from './pages/desktop/MyPage';
import Ranking from './pages/desktop/Ranking';
import Header from './components/desktop/Header';
import Footer from './components/desktop/Footer';
import Login from './pages/desktop/Login';
import SignUp from './pages/desktop/SignUp';
import ForgotPassword from './pages/desktop/ForgotPassword';
import EditUserInfo from './pages/desktop/EditUserInfo';
import Bye from './pages/desktop/Bye';
import MusicSelection from './pages/desktop/MusicSelection';
import LandingPage from './components/desktop/LandingPage';
import HeaderMobile from './components/mobile/HeaderMobile';
import TabBarMobile from './components/mobile/TabBarMobile';
import LandingPageMobile from './components/mobile/LandingPageMobile';
import axios from 'axios';
import './App.css';

/*
  import { useMediaQuery } from 'react-responsive';
  const isMobile = useMediaQuery({ query: '(max-width: 667px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  */

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  // const isMobile = useMediaQuery({ query: '(max-aspect-ratio: 3/4)' });
  const [userInfo, setUserInfo] = useState('');
  const [rankingList, setRankingList] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  useLayoutEffect(() => {
    const token = localStorage.getItem('Token');
    if(!token) return;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const getRequests = [
      ['https://final.eax.kr/api/users', setUserInfo],
      ['https://final.eax.kr/api/ranks', setRankingList],
      ['https://final.eax.kr/api/playlists', setPlaylist],
    ];
    for (const request of getRequests) {
      axios
        .get(request[0], { headers })
        .then((res) => {
          if (res.data['result']) request[1](res.data.result);
          else request[1](res.data);
        })
        .catch((err) => {
          console.dir(err);
        });
    }
  }, []);

  if (isMobile) {
    return (
      <Router>
        <HeaderMobile />
        <Routes>
          <Route path="/" element={<LandingPageMobile />} />
          <Route path="/music" element={<MusicSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/editinfo" element={<EditUserInfo />} />
          <Route path="/forgotpw" element={<ForgotPassword />} />
          <Route path="/delete" element={<Bye />} />
          <Route
            path="/mypage"
            element={
              <MyPage
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                playlist={playlist}
                setPlaylist={setPlaylist}
              />
            }
          />
          <Route
            path="/ranking"
            element={<Ranking userInfo={userInfo} rankingList={rankingList} />}
          />
        </Routes>
        <TabBarMobile />
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <LandingPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/music"
          element={
            <>
              <Header />
              <MusicSelection />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpw" element={<ForgotPassword />} />
        <Route path="/delete" element={<Bye />} />
        <Route
          path="/editinfo"
          element={
            <>
              <Header />
              <EditUserInfo />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/mypage"
          element={
            <>
              <Header />
              <MyPage
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                playlist={playlist}
                setPlaylist={setPlaylist}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/ranking"
          element={
            <>
              <Header />
              <Ranking userInfo={userInfo} rankingList={rankingList} />
              {/* <Footer /> */}
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
