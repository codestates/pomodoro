import styled from 'styled-components';

import { ReactComponent as MusicIcon } from '../../images/music.svg';

const MusiclistContainer = styled.div``;
const MusiclistIconCircle = styled.div`
  border-radius: 50%;
  background: #f7f2ed;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  width: 16vw;
  height: 16vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuForMusiclistMobile = () => {
  return (
    <MusiclistContainer>
      <MusiclistIconCircle>
        <MusicIcon width="8vw" height="8vw" />
      </MusiclistIconCircle>
    </MusiclistContainer>
  );
};

export default MenuForMusiclistMobile;
