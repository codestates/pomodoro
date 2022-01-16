import React, { useState, useLayoutEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import MyPage from './pages/desktop/MyPage';
import Ranking from './pages/desktop/Ranking';
import Login from './pages/desktop/Login';
import SignUp from './pages/desktop/SignUp';
import ForgotPassword from './pages/desktop/ForgotPassword';
import EditUserInfo from './pages/desktop/EditUserInfo';
import Bye from './pages/desktop/Bye';
import MusicSelection from './pages/desktop/MusicSelection';
import LandingPage from './pages/desktop/LandingPage';
import LandingPageMobile from './pages/mobile/LandingPageMobile';
import LayoutWithHeader from './pages/desktop/LayoutWithHeader';
import LayoutMobileWithHeader from './pages/mobile/LayoutMobileWithHeader';
import TabBarMobile from './components/mobile/TabBarMobile';
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
  const [userInfo, setUserInfo] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [tags, setTags] = useState(false);

  // 유저 정보 요청 함수
  const requestUserInfo = (specificRequest) => {
    const ENDPOINT = 0;
    const STATE_TO_STORE = 1;
    const TOKEN_REQUIRED = 2;

    const token = localStorage.getItem('Token');
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const requestDictionary = [
      ['https://final.eax.kr/api/users', setUserInfo, TOKEN_REQUIRED],
      ['https://final.eax.kr/api/playlists', setPlaylist, TOKEN_REQUIRED],
      ['https://final.eax.kr/api/tags', setTags],
    ];
    //특정요청만 다시 불러오는 경우 배열과 아닌경우를 분리하여 융통성 있개 배치
    let getRequests = [];
    if (specificRequest) {
      if (Array.isArray(specificRequest))
        for (const requestID of specificRequest)
          getRequests.push(requestDictionary[requestID]);
      else getRequests.push(requestDictionary[specificRequest]);
    } else getRequests = requestDictionary;

    //Driver code : 요청 확인 후 각 State에 저장
    for (const request of getRequests) {
      //토큰 요구사항인데 값이 없으면 실행하지 않음
      if (request[TOKEN_REQUIRED] && !token) {
        request[STATE_TO_STORE](null);
        continue;
      }
      //axios 요청 후 결과값을 State에 저장
      axios
        .get(request[ENDPOINT], { headers })
        .then((res) => {
          if (res.data['result']) request[STATE_TO_STORE](res.data.result);
          else request[STATE_TO_STORE](res.data);
        })
        .catch((err) => {
          //오류 발생시 토큰관련 문제인 경우 토큰을 삭제
          if (request[TOKEN_REQUIRED] && err.response.data === 'unauthorized')
            localStorage.removeItem('Token');
          request[STATE_TO_STORE](null);
          console.dir(err);
        });
    }
  };

  //로드시 각종 State에 넣을 값을 최초 1회 요청
  useLayoutEffect(() => {
    requestUserInfo();
  }, []);

  if (isMobile) {
    return (
      <UserContext.Provider
        value={{ userInfo, playlist, requestUserInfo, tags }}
      >
        <Router>
          <Routes>
            <Route element={<LayoutMobileWithHeader />}>
              <Route path="/" element={<LandingPageMobile />} />
              <Route path="/music" element={<MusicSelection tags={tags} />} />
              <Route path="/editinfo" element={<EditUserInfo />} />
              <Route path="/delete" element={<Bye />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/ranking" element={<Ranking />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpw" element={<ForgotPassword />} />
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
          <Route element={<LayoutWithHeader />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/music" element={<MusicSelection tags={tags} />} />
            <Route path="/delete" element={<Bye />} />
            <Route path="/editinfo" element={<EditUserInfo />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpw" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
