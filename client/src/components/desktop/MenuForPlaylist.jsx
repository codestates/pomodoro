import { useContext } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { ReactComponent as PlaylistIcon } from '../../images/playlists.svg';
import { ReactComponent as SelectedIcon } from '../../images/select.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';
import { UserContext } from '../../App';

const PlaylistContainer = styled.div`
  flex: 388 388 auto;
  max-width: 38.8rem;
  background: rgba(242, 231, 218, 0.6);
  box-shadow: 0.3rem 0.3rem 0.4rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
`;

const PlaylistMenuNav = styled.div`
  margin: 1.2rem auto 2.4rem auto;
  max-width: 32.1rem;
  display: flex;
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
  color: rgba(0, 0, 0, 0.9);
  font-style: normal;
  font-weight: bold;
  font-size: 2.5rem;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const WithEmptyPlaylist = styled.div`
  max-width: 26.6rem;
  margin: 0 auto 1.5rem auto;
  font-style: normal;
  font-weight: bold;
  font-size: 2.3rem;
  color: rgba(85, 85, 85, 0.8);
  cursor: pointer;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const DropZone = styled.div`
  max-width: 34.8rem;
  margin: 0 auto 2rem auto;
  font-style: normal;
  font-weight: bold;
  font-size: 2.3rem;
`;

const DragItem = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const CheckBoxDiv = styled.div`
  flex: 42 42 auto;
  max-width: 4.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.div`
  flex: 208 208 auto;
  max-width: 20.8rem;
  color: rgba(13, 24, 37, 0.9);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
`;

const TotalTimeDiv = styled.div`
  flex: 73 73 auto;
  max-width: 7.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2.2rem;
  color: rgba(0, 0, 0, 0.5);
`;

const DeleteDiv = styled.div`
  flex: 26 26 auto;
  max-width: 2.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const musicTimeFormat = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const MenuForPlaylist = ({ currentPlaylist, setCurrentPlaylist }) => {
  const { playlist, requestUserInfo } = useContext(UserContext);

  const reorderList = (result) => {
    console.dir(result);
  };

  return (
    <PlaylistContainer>
      <PlaylistMenuNav>
        <Circle>
          <PlaylistIcon width={34.4} height={34.4} />
        </Circle>
        <NavGhostDiv />
        <NavTitle>저장된 플레이리스트</NavTitle>
      </PlaylistMenuNav>
      <WithEmptyPlaylist>빈 플레이리스트로 시작</WithEmptyPlaylist>
      <DragDropContext onDragEnd={reorderList}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <DropZone
              {...provided.droppableProps}
              ref={provided.innerRef}
              drag={snapshot.isDraggingOver}
            >
              {playlist?.map(
                ({ playlist_id, playlist_name, playlist_time }, index) => (
                  <Draggable
                    key={playlist_id}
                    draggableId={String(playlist_id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <DragItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        drag={snapshot.isDragging}
                        dragStyle={provided.draggableProps.style}
                      >
                        <CheckBoxDiv>
                          {currentPlaylist === playlist_id ? (
                            <SelectedIcon width={24} height={24} />
                          ) : (
                            false
                          )}
                        </CheckBoxDiv>
                        <TitleDiv
                          onClick={() => setCurrentPlaylist(playlist_id)}
                        >
                          {playlist_name}
                        </TitleDiv>
                        <TotalTimeDiv>
                          {playlist_time
                            ? musicTimeFormat(playlist_time)
                            : '--:--'}
                        </TotalTimeDiv>
                        <DeleteDiv>
                          <DeleteIcon width={26} height={26} />
                        </DeleteDiv>
                      </DragItem>
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
            </DropZone>
          )}
        </Droppable>
      </DragDropContext>
    </PlaylistContainer>
  );
};

export default MenuForPlaylist;
