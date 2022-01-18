import { useContext, useEffect, useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

import { ReactComponent as MusicIcon } from '../../images/music.svg';
import { ReactComponent as DnDIcon } from '../../images/dragAndDrop.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';
import { UserContext } from '../../App';

const MusicListContainer = styled.div`
  flex: 817 817 auto;2022-01-16 04:32:43
  max-width: 81.7rem;
  max-height: 50vh;
  overflow-y: auto;
  background: rgba(242, 231, 218, 0.6);
  box-shadow: 0.3rem 0.3rem 0.4rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
`;

const MusicListNav = styled.div`
  margin: 1.2rem auto 2.4rem 5rem;
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
  color: rgba(0, 0, 0, 0.9);
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

const DropZone = styled.div`
  max-width: 73.8rem;
  margin: 0 auto 2rem auto;
  font-style: normal;
  font-weight: bold;
  font-size: 2.3rem;
`;

const DragItem = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const DnDButtonDiv = styled.div`
  flex: 14 14 auto;
  max-width: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IndexDiv = styled.div`
  flex: 64 64 auto;
  max-width: 6.4rem;
  color: rgba(13, 24, 37, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MiddleGhostDiv = styled.div`
  flex: 10 10 auto;
  max-width: 1rem;
`;

const TitleDiv = styled.div`
  flex: 467 467 auto;
  max-width: 46.7rem;
  color: rgba(13, 24, 37, 0.9);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
`;

const TotalTimeDiv = styled.div`
  flex: 155 155 auto;
  max-width: 15.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2.2rem;
  color: rgba(0, 0, 0, 0.5);
`;

const DeleteDiv = styled.div`
  flex: 28 28 auto;
  max-width: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const MenuForMusiclist = ({ currentPlaylist }) => {
  const {
    userInfo,
    musicList,
    playlist,
    setPlaylist,
    setMusicList,
    requestUserInfo,
  } = useContext(UserContext);
  const [musicListStorage, setMusicListStorage] = useState({});
  const previousPlaylist = useRef(null);

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
    return () => (previousPlaylist.current = currentPlaylist);
  }, [currentPlaylist]);

  useEffect(() => {
    if (!currentPlaylist) {
      setMusicList([]);
      sessionStorage.setItem('musicList', JSON.stringify([]));
      return;
    }
    if (userInfo) {
      getMusicList();
      return;
    }
    let listToChange = musicListStorage[String(currentPlaylist)];
    listToChange = listToChange ? JSON.parse(listToChange) : [];
    const newMusicStorage = { ...musicListStorage };
    newMusicStorage[String(previousPlaylist.current)] =
      JSON.stringify(musicList);
    //console.log(`prev: ${previousPlaylist.current}, curr: ${currentPlaylist}`);
    setMusicList(listToChange);
    sessionStorage.setItem('musicList', JSON.stringify(listToChange));
    setMusicListStorage(newMusicStorage);
  }, [userInfo, currentPlaylist]);

  const reorderList = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const items = reorder(
      musicList,
      result.source.index,
      result.destination.index
    );
    if (userInfo) sendMusicList(items);
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
    if (userInfo)
      axios
        .delete(endpoint, { headers })
        .then(() => {
          sendMusicList(removedList);
          if (playlist_idx === -1) return;
          const playlistLength = removedList.reduce(
            (acc, { music_time }) => acc + Number(music_time),
            0
          );
          const newPlaylist = [...playlist];
          newPlaylist[playlist_idx].playlist_time = playlistLength;
          setPlaylist(newPlaylist);
          return;
        })
        .catch((err) => {
          console.log(err);
          setMusicList(musicList);
          sessionStorage.setItem('musicList', JSON.stringify(musicList));
        });
    setMusicList(removedList);
    sessionStorage.setItem('musicList', JSON.stringify(removedList));
    if (userInfo || playlist_idx === -1) return;
    const playlistLength = removedList.reduce(
      (acc, { music_time }) => acc + Number(music_time),
      0
    );
    const newPlaylist = [...playlist];
    newPlaylist[playlist_idx].playlist_time = playlistLength;
    setPlaylist(newPlaylist);
    return;
  };

  return (
    <MusicListContainer>
      <MusicListNav>
        <Circle>
          <MusicIcon width={34.4} height={34.4} />
        </Circle>
        <NavGhostDiv />
        <NavTitle>현재 재생 목록</NavTitle>
      </MusicListNav>
      {musicList.length ? (
        <DragDropContext onDragEnd={reorderList}>
          <Droppable droppableId="droppableForMusic">
            {(provided, snapshot) => (
              <DropZone
                {...provided.droppableProps}
                ref={provided.innerRef}
                drag={snapshot.isDraggingOver}
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
                          <DnDButtonDiv>
                            <DnDIcon width={14} height={22} />
                          </DnDButtonDiv>
                          <IndexDiv>{index + 1}</IndexDiv>
                          <MiddleGhostDiv />
                          <TitleDiv>{music_name}</TitleDiv>
                          <TotalTimeDiv>
                            {music_time ? musicTimeFormat(music_time) : '--:--'}
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
      ) : (
        <EmptyPlaylist>플레이리스트가 비어 있습니다.</EmptyPlaylist>
      )}
    </MusicListContainer>
  );
};

export default MenuForMusiclist;
