import { useState, useRef, useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

import { ReactComponent as MusicIcon } from '../../images/music.svg';
import { ReactComponent as DnDIcon } from '../../images/dragAndDrop.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';
import { UserContext } from '../../App';

const MusiclistContainer = styled.div``;
const MusiclistIconStaticCircle = styled.div`
  border-radius: 50%;
  background: #f7f2ed;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  width: 16vw;
  height: 16vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MusiclistIconCircle = styled.div`
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

const MusiclistMenuContainer = styled.div`
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

const MusicListNameWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 13fr 6fr 1fr;
  font-style: normal;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const MusiclistName = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 2.3rem; //TODO
  color: rgba(13, 24, 37, 0.9);
  white-space: nowrap;
  overflow: hidden;
`;

const DropZone = styled.div`
  margin-top: 1rem; //TODO
  font-style: normal;
  font-weight: bold;
  font-size: 2.3rem; //TODO
  height: ${({ posY, size }) => size.end - posY?.top}px;
  overflow-y: auto;
`;

const DragItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.4fr 8.5fr 2.7fr 0.9fr 1fr;
  margin-bottom: 1rem; //TODO
`;

const DnDButtonDiv = styled.div`
  justify-self: center;
  align-self: center;
`;

const TitleDiv = styled.div`
  color: rgba(13, 24, 37, 0.9);
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
`;

const DeleteDiv = styled.div`
  justify-self: center;
  align-self: center;
`;

const TotalTimeDiv = styled.div`
  justify-self: left;
  align-self: center;
  font-size: 2.2rem;
  color: rgba(0, 0, 0, 0.5);
`;

const GhostDiv = styled.div``;

const musicTimeFormat = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const MenuForMusiclistMobile = ({ size, currentPlaylist }) => {
  const { userInfo, musicList, playlist, setMusicList, requestUserInfo } =
    useContext(UserContext);
  const [expandPlaylist, setExpandPlaylist] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const musiclistRef = useRef(null);
  const scrollRef = useRef(null);

  const playlist_idx = useMemo(() => {
    return playlist.findIndex(
      (playlist) => playlist.playlist_id === currentPlaylist
    );
  }, [playlist, currentPlaylist]);

  const getMusicList = () => {
    const endpoint = `https://final.eax.kr/api/playlists/${currentPlaylist}`;
    const token = localStorage.getItem('Token');
    const headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .get(endpoint, { headers })
      .then((res) => {
        setMusicList(res.data.result);
        sessionStorage.setItem('musicList', JSON.stringify(res.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMusicList = (items = musicList) => {
    const endpoint = `https://final.eax.kr/api/playlists/${currentPlaylist}`;
    const token = localStorage.getItem('Token');
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const music_order = items.map(({ music_id }) => music_id);
    axios
      .put(endpoint, { music_order }, { headers })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        setMusicList(musicList);
        sessionStorage.setItem('musicList', JSON.stringify(musicList));
      });
  };

  useEffect(() => {
    if (!currentPlaylist || !userInfo) {
      setMusicList([]);
      sessionStorage.setItem('musicList', JSON.stringify([]));
      return;
    }
    getMusicList();
  }, [userInfo, currentPlaylist]);

  const reorderList = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const items = reorder(
      musicList,
      result.source.index,
      result.destination.index
    );
    sendMusicList(items);
    setMusicList(items);
    sessionStorage.setItem('musicList', JSON.stringify(items));
  };

  const removeMusic = (e) => {
    const endpoint = `https://final.eax.kr/api/playlists/${currentPlaylist}/${e.currentTarget.dataset.musicid}`;
    const token = localStorage.getItem('Token');
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const removedList = [...musicList];
    removedList.splice(e.currentTarget.dataset.id, 1);
    axios
      .delete(endpoint, { headers })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        setMusicList(musicList);
        sessionStorage.setItem('musicList', JSON.stringify(musicList));
      });
    setMusicList(removedList);
    sessionStorage.setItem('musicList', JSON.stringify(removedList));
  };

  const fadeOutHandler = () => {
    setFadeOut(true);
    setTimeout(() => {
      setFadeOut(false);
      setExpandPlaylist(false);
    }, 1000);
  };

  return (
    <MusiclistContainer>
      <MusiclistIconStaticCircle
        ref={musiclistRef}
        onClick={() => {
          setFadeOut(false);
          setExpandPlaylist(true);
        }}
      >
        <MusicIcon width="8vw" height="8vw" />
      </MusiclistIconStaticCircle>
      <MusiclistMenuContainer
        expandPlaylist={expandPlaylist}
        size={size}
        fadeOut={fadeOut}
      >
        <MusiclistIconCircle
          posX={musiclistRef.current && musiclistRef.current.offsetLeft}
          onClick={fadeOutHandler}
        >
          <MusicIcon width="8vw" height="8vw" />
        </MusiclistIconCircle>
        {musicList.length ? (
          <>
            <MusicListNameWrapper ref={scrollRef}>
              <GhostDiv />
              <MusiclistName>
                {playlist[playlist_idx].playlist_name}
              </MusiclistName>
              <TotalTimeDiv>
                {playlist[playlist_idx].playlist_time
                  ? musicTimeFormat(playlist[playlist_idx].playlist_time)
                  : '--:--'}
              </TotalTimeDiv>
              <GhostDiv />
            </MusicListNameWrapper>
            <DragDropContext onDragEnd={reorderList}>
              <Droppable droppableId="droppableForMusic">
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
                    {musicList.map(
                      ({ music_id, music_name, music_time }, index) => (
                        <Draggable
                          key={music_id}
                          draggableId={String(music_id)}
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
                              <DnDButtonDiv>
                                <DnDIcon width={14} height={22} />
                              </DnDButtonDiv>
                              <GhostDiv />
                              <TitleDiv>{music_name}</TitleDiv>
                              <TotalTimeDiv>
                                {music_time
                                  ? musicTimeFormat(music_time)
                                  : '--:--'}
                              </TotalTimeDiv>
                              <DeleteDiv>
                                <DeleteIcon
                                  width={26}
                                  height={26}
                                  data-id={index}
                                  data-musicid={music_id}
                                  onClick={removeMusic}
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
          </>
        ) : (
          <EmptyPlaylist>플레이리스트가 비어 있습니다.</EmptyPlaylist>
        )}
      </MusiclistMenuContainer>
    </MusiclistContainer>
  );
};

export default MenuForMusiclistMobile;
