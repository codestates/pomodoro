import { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

import { ReactComponent as PlaylistIcon } from '../../images/playlists.svg';
import { ReactComponent as SelectedIcon } from '../../images/select.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';
import { UserContext } from '../../App';

const PlaylistContainer = styled.div``;
const PlaylistIconStaticCircle = styled.div`
  border-radius: 50%;
  background: #f7f2ed;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  width: 16vw;
  height: 16vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaylistIconCircle = styled.div`
  position: relative;
  border-radius: 50%;
  background: #f7f2ed;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  width: 16vw;
  height: 16vw;
  display: flex;
  justify-content: center;
  align-items: center;
  left: ${(props) => props.posX}px;
  top: -8vw;
  z-index: 1;
`;

const PlaylistMenuContainer = styled.div`
  visibility: ${({ expandPlaylist }) =>
    expandPlaylist ? 'visible' : 'hidden'};
  position: absolute;
  background: #f2e7da;
  width: 100%;
  left: 0;
  top: ${({ size }) => size.end * 0.3}px;
  height: ${({ size }) => size.end * 0.7}px;

  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 60px 60px 0px 0px;
  z-index: 1;

  animation: ${({ fadeOut }) => (fadeOut ? 'fadeout 1s' : 'fadein 1s')};

  @keyframes fadein {
    from {
      opacity: 0;
      transform: translatey(100%);
    }
    to {
      opacity: 1;
      transform: translatey(0%);
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
      transform: translatey(0%);
    }
    to {
      opacity: 0;
      transform: translatey(100%);
    }
  }
`;

const EmptyPlaylistWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.7fr 16fr;
`;

const WithEmptyPlaylist = styled.div`
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
  margin-top: 2rem; //TODO
  font-style: normal;
  font-weight: bold;
  font-size: 2.3rem; //TODO
  height: ${({ posY, size }) => size.end - posY?.top}px;
  overflow-y: auto;
`;

const DragItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.7fr 10.4fr 2.9fr 1.6fr 1fr;
  margin-bottom: 1.5rem; //TODO
`;

const GhostDiv = styled.div``;

const CheckBoxDiv = styled.div`
  justify-self: center;
  align-self: center;
`;

const TitleDiv = styled.div`
  color: rgba(13, 24, 37, 0.9);
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
`;

const TotalTimeDiv = styled.div`
  justify-self: left;
  align-self: center;
  font-size: 2.2rem;
  color: rgba(0, 0, 0, 0.5);
`;

const DeleteDiv = styled.div`
  justify-self: center;
  align-self: center;
`;

const PlusButton = styled.div`
  position: absolute;
  float: right;
  right: 5vw;
  bottom: 2vh;
  width: 12vw;
  height: 12vw;
  font-size: 10vw;
  font-style: normal;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f7f2ed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  color: #ff0000;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const musicTimeFormat = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const MenuForPlaylistMobile = ({
  size,
  currentPlaylist,
  setCurrentPlaylist,
}) => {
  const { playlist, setPlaylist, userInfo, requestUserInfo } =
    useContext(UserContext);
  const [expandPlaylist, setExpandPlaylist] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const playlistRef = useRef(null);
  const scrollRef = useRef(null);

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

  const fadeOutHandler = () => {
    setFadeOut(true);
    setTimeout(() => {
      setFadeOut(false);
      setExpandPlaylist(false);
    }, 1000);
  };

  const addPlaylistHandler = (e) => {
    if (playlist.length >= 10) {
      alert('플레이리스트는 10개까지만 생성 가능합니다.');
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PlaylistContainer>
      <PlaylistIconStaticCircle
        ref={playlistRef}
        onClick={() => {
          setFadeOut(false);
          setExpandPlaylist(true);
        }}
      >
        <PlaylistIcon width="8vw" height="8vw" />
      </PlaylistIconStaticCircle>
      <PlaylistMenuContainer
        expandPlaylist={expandPlaylist}
        size={size}
        fadeOut={fadeOut}
      >
        <PlaylistIconCircle
          posX={playlistRef.current && playlistRef.current.offsetLeft}
          onClick={fadeOutHandler}
        >
          <PlaylistIcon width="8vw" height="8vw" />
        </PlaylistIconCircle>
        <EmptyPlaylistWrapper ref={scrollRef}>
          <GhostDiv />
          <CheckBoxDiv>
            {!currentPlaylist && <SelectedIcon width={24} height={24} />}
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
                posY={
                  scrollRef.current &&
                  scrollRef.current.nextElementSibling.getBoundingClientRect()
                }
                size={size}
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
                          <GhostDiv />
                          <CheckBoxDiv>
                            {currentPlaylist === playlist_id && (
                              <SelectedIcon width={24} height={24} />
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
                          <GhostDiv />
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
        <PlusButton onClick={addPlaylistHandler}>+</PlusButton>
      </PlaylistMenuContainer>
    </PlaylistContainer>
  );
};

export default MenuForPlaylistMobile;
