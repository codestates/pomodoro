import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import MyPage from './pages/desktop/MyPage';
import Ranking from './pages/desktop/Ranking';
import Header from './components/desktop/Header';
import Footer from './components/desktop/Footer';

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
        withCredentials: true,
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
        withCredentials: true,
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
        withCredentials: true,
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
      <Header />
      <Routes>
        <Route
          path="/mypage"
          element={<MyPage userInfo={userInfo} playlists={playlists} />}
        />
        <Route
          path="/ranking"
          element={<Ranking userInfo={userInfo} rankingList={rankingList} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
