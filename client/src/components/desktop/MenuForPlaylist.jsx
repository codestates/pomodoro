import { useContext, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

import { ConfirmModal } from '../../components/desktop/ConfirmModal';
import { ReactComponent as PlaylistIcon } from '../../images/playlists.svg';
import { ReactComponent as SelectedIcon } from '../../images/select.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';
import { UserContext } from '../../App';

const PlaylistContainer = styled.div`
  flex: 388 388 auto;
  max-width: 38.8rem;
  max-height: 50vh;
  overflow-y: auto;
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

const EmptyPlaylistWrapper = styled.div`
  max-width: 34.8rem;
  margin: 0 auto 1.5rem auto;
  display: flex;
  align-items: center;
`;

const WithEmptyPlaylist = styled.div`
  max-width: 26.6rem;
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
  flex: 180 180 auto;
  max-width: 18rem;
  color: rgba(13, 24, 37, 0.9);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
`;

const TotalTimeDiv = styled.div`
  flex: 101 101 auto;
  max-width: 10.1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 2.2rem;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 0.5rem;
  color: rgba(0, 0, 0, 0.5);
`;

const DeleteDiv = styled.div`
  flex: 26 26 auto;
  max-width: 2.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewPlaylistWrapper = styled.div`
  max-width: 22.2rem;
  margin: 4rem auto 1.5rem auto;
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  color: rgba(85, 85, 85, 0.8);
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
`;

const PlusButton = styled.div`
  flex: 39 39 auto;
  max-width: 3.9rem;
  font-size: 3.5rem;
  justify-self: flex-start;
`;

const AddPlaylistDiv = styled.div`
  flex: 183 183 auto;
  max-width: 18.3rem;
  font-size: 2.1rem;
  justify-self: center;
`;

const musicTimeFormat = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return `${hours > 0 ? `${hours}:` : ''}${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const MenuForPlaylist = ({ currentPlaylist, setCurrentPlaylist }) => {
  const { playlist, setPlaylist, userInfo, requestUserInfo } =
    useContext(UserContext);
  const [displayModalMessage, setDisplayModalMessage] = useState(null);

  const reorderList = (result) => {
    //TODO : Advanced
    return;
  };

  const removePlaylist = (e) => {
    if (!userInfo) {
      const playlistidx = e.currentTarget.dataset.id;
      const newPlaylist = [...playlist];
      newPlaylist.splice(playlistidx, 1);
      setPlaylist(newPlaylist);
      return;
    }

    const { id, playlistid } = e.currentTarget.dataset;
    const endpoint = `https://final.eax.kr/api/playlists/${playlistid}`;
    const token = localStorage.getItem('Token');
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const removedList = [...playlist];
    removedList.splice(id, 1);
    axios
      .delete(endpoint, { headers })
      .then(() => {
        if (currentPlaylist == playlistid) setCurrentPlaylist(0);
        requestUserInfo(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addPlaylistHandler = (e) => {
    if (playlist.length >= 10) {
      setDisplayModalMessage('플레이리스트는 10개까지만 생성 가능합니다.');
      return;
    }
    if (!userInfo) {
      let playlist_id;
      if (playlist?.length) {
        const lastPlaylist = Math.min(
          ...playlist.map(({ playlist_id }) => playlist_id)
        );
        playlist_id = lastPlaylist - 1;
      } else {
        playlist_id = -1;
        sessionStorage.setItem('musicListStorage', JSON.stringify({}));
      }
      const playlist_name = `임시 리스트 ${playlist_id * -1}`;
      const playlist_time = null;
      const newPlaylist = [...playlist];
      newPlaylist.push({ playlist_id, playlist_name, playlist_time });
      setPlaylist(newPlaylist);
      setCurrentPlaylist(playlist_id);
      return;
    }
    const endpoint = `https://final.eax.kr/api/playlists`;
    const token = localStorage.getItem('Token');
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const playlist_name = '새 플레이리스트 ' + (playlist.length + 1);

    axios
      .post(endpoint, { playlist_name }, { headers })
      .then((res) => {
        requestUserInfo(1);
        setCurrentPlaylist(res.data.playlist_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PlaylistContainer>
      {displayModalMessage && (
        <ConfirmModal
          text={displayModalMessage}
          handleModal={() => setDisplayModalMessage(null)}
        />
      )}
      <PlaylistMenuNav>
        <Circle>
          <PlaylistIcon width={34.4} height={34.4} />
        </Circle>
        <NavGhostDiv />
        <NavTitle>저장된 플레이리스트</NavTitle>
      </PlaylistMenuNav>
      <EmptyPlaylistWrapper>
        <CheckBoxDiv>
          {currentPlaylist ? false : <SelectedIcon width={24} height={24} />}
        </CheckBoxDiv>
        <WithEmptyPlaylist
          onClick={() => {
            setCurrentPlaylist(0);
          }}
        >
          빈 플레이리스트로 시작
        </WithEmptyPlaylist>
      </EmptyPlaylistWrapper>
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
                          <DeleteIcon
                            width={26}
                            height={26}
                            data-id={index}
                            data-playlistid={playlist_id}
                            onClick={removePlaylist}
                          />
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
      <NewPlaylistWrapper onClick={addPlaylistHandler}>
        <PlusButton>+</PlusButton>
        <AddPlaylistDiv>플레이리스트 추가...</AddPlaylistDiv>
      </NewPlaylistWrapper>
    </PlaylistContainer>
  );
};

export default MenuForPlaylist;
