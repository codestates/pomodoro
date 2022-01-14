import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { ReactComponent as MusicIcon } from '../../images/music.svg';

const MusicListContainer = styled.div`
  flex: 817 817 auto;
  max-width: 81.7rem;
  background: rgba(242, 231, 218, 0.6);
  box-shadow: 0.3rem 0.3rem 0.4rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
`;

const MusicListNav = styled.div`
  margin: 1.2rem auto 2.8rem 5rem;
  max-width: 32.1rem;
  display: flex;
  justify-content: baseline;
  align-items: center;
`;

const Circle = styled.div`
  flex: 64 64 auto;
  max-width: 6.4rem;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  background: #f7f2ed;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavGhostDiv = styled.div`
  flex: 32 32 auto;
  max-width: 3.2rem;
`;

const NavTitle = styled.div`
  flex: 223 223 auto;
  max-width: 22.3rem;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const EmptyPlaylist = styled.div`
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  color: rgba(85, 85, 85, 0.8);
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const MenuForMusiclist = () => {
  return (
    <MusicListContainer>
      <MusicListNav>
        <Circle>
          <MusicIcon width={34.4} height={34.4} />
        </Circle>
        <NavGhostDiv />
        <NavTitle>현재 재생 목록</NavTitle>
      </MusicListNav>
      <EmptyPlaylist>플레이리스트가 비어 있습니다.</EmptyPlaylist>
    </MusicListContainer>
  );
};

export default MenuForMusiclist;
