import { useMediaQuery } from 'react-responsive';

import './App.css';
import MyPage from './pages/desktop/MyPage.jsx';
import MyPageMobile from './pages/mobile/MyPageMobile.jsx';

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 667px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  return <>{isMobile ? <MyPageMobile /> : <MyPage />}</>;
};

export default App;
