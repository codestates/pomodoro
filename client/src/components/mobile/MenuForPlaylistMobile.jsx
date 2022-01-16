import styled from 'styled-components';

import { ReactComponent as PlaylistIcon } from '../../images/playlists.svg';

const PlaylistContainer = styled.div``;
const PlaylistIconCircle = styled.div`
  border-radius: 50%;
  background: #f7f2ed;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  width: 16vw;
  height: 16vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuForPlaylistMobile = () => {
  return (
    <PlaylistContainer>
      <PlaylistIconCircle>
        <PlaylistIcon width="8vw" height="8vw" />
      </PlaylistIconCircle>
    </PlaylistContainer>
  );
};

export default MenuForPlaylistMobile;
