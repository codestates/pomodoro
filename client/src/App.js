import React, { useState, useLayoutEffect, createContext } from 'react';
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
import LandingPageMobile from './pages/mobile/LandingPageMobile';
import HeaderMobile from './components/mobile/HeaderMobile';
import TabBarMobile from './components/mobile/TabBarMobile';
import LandingPage from './pages/desktop/LandingPage';
import axios from 'axios';
import './App.css';

export const UserContext = createContext({
  userInfo: '',
  rankingList: [],
  playlist: [],
  requestUserInfo: () => {},
  tags: null,
});

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const [userInfo, setUserInfo] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [tags, setTags] = useState(false);

  const requestUserInfo = () => {
    const ENDPOINT = 0;
    const STATE_TO_STORE = 1;
    const TOKEN_REQUIRED = 2;

    const token = localStorage.getItem('Token');
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const getRequests = [
      ['https://final.eax.kr/api/users', setUserInfo, TOKEN_REQUIRED],
      ['https://final.eax.kr/api/playlists', setPlaylist, TOKEN_REQUIRED],
      ['https://final.eax.kr/api/tags', setTags],
    ];

    for (const request of getRequests) {
      if (request[TOKEN_REQUIRED] && !token) continue;
      axios
        .get(request[ENDPOINT], { headers })
        .then((res) => {
          if (res.data['result']) request[STATE_TO_STORE](res.data.result);
          else request[STATE_TO_STORE](res.data);
        })
        .catch((err) => {
          console.dir(err);
        });
    }
  };

  useLayoutEffect(() => {
    requestUserInfo();
  }, []);

  if (isMobile) {
    return (
      <UserContext.Provider
        value={{ userInfo, playlist, requestUserInfo, tags }}
      >
        <Router>
          <HeaderMobile />
          <Routes>
            <Route path="/" element={<LandingPageMobile />} />
            <Route path="/music" element={<MusicSelection tags={tags} />} />
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
            <Route path="/ranking" element={<Ranking userInfo={userInfo} />} />
          </Routes>
          <TabBarMobile />
        </Router>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={{ userInfo, playlist, requestUserInfo, tags }}>
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
                <MusicSelection tags={tags} />
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
          <Route path="/ranking" element={<Ranking userInfo={userInfo} />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
