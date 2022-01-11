import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MyPage from './pages/desktop/MyPage';
import Ranking from './pages/desktop/Ranking';
import Header from './components/desktop/Header';
import Footer from './components/desktop/Footer';
import Login from './pages/desktop/Login';
import SignUp from './pages/desktop/SignUp';
import ForgotPassword from './pages/desktop/ForgotPassword';

/*
  import { useMediaQuery } from 'react-responsive';
  const isMobile = useMediaQuery({ query: '(max-width: 667px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
 */

const App = () => {
  const [userInfo, setUserInfo] = useState('');
  const [rankingList, setRankingList] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get('https://final.eax.kr/api/users', {
        headers: { authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        return;
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://final.eax.kr/api/ranks', {
        headers: { authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .then((res) => {
        setRankingList(res.data.result);
      })
      .catch((err) => {
        return;
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://final.eax.kr/api/playlists', {
        headers: { authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .then((res) => {
        setPlaylists(res.data.result);
      })
      .catch((err) => {
        return;
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpw" element={<ForgotPassword />} />
        <Route
          path="/mypage"
          element={
            <>
              <Header />
              <MyPage userInfo={userInfo} playlists={playlists} />
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
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
