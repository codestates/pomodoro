import React, { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as Edit } from '../../images/edit.svg';
import { ReactComponent as Delete } from '../../images/delete.svg';
import axios from 'axios';
import { UserContext } from '../../App';

const SERVER_ENDPOINT =
  process.env.REACT_APP_ENDPOINT || window.location.origin;

const Container = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3em;
`;

const EditMode = styled.input`
  font-size: 1.5rem;
  padding: 0.3em 0.5em;
  border-radius: 3px;
`;

const Title = styled.div`
  font-size: 1.8rem;
`;

const Icons = styled.div`
  display: flex;
`;

const StyledEdit = styled.div`
  margin-right: 2.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const StyledDelete = styled(StyledEdit)`
  margin-right: 0;
`;

const Playlist = ({ order, name, id, index }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(name);
  const [edited, setEdited] = useState(false);
  const inputRef = useRef(null);
  const { playlist, setPlaylist } = useContext(UserContext);

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const handleBlur = async () => {
    setEditMode(false);
    if (!edited) return;
    await axios
      .patch(
        `${SERVER_ENDPOINT}/api/playlists/${id}`,
        {
          playlist_name: title,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('Token')}`,
          },
        }
      )
      .then((res) => {
        const list = [...playlist];
        list[index].playlist_name = title;
        setPlaylist(list);
        setEdited(false);
      })
      .catch((error) => console.log(error));
  };

  const handleEditMode = () => {
    const newTitle = inputRef.current.value;
    if (newTitle !== title) {
      setEdited(true);
      setTitle(newTitle);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    await axios
      .delete(`${SERVER_ENDPOINT}/api/playlists/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .then((res) => {
        const list = [...playlist];
        list.splice(index, 1);
        setPlaylist(list);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Container>
      {editMode ? (
        <EditMode
          placeholder="플레이라스트 이름"
          type="text"
          value={title}
          onBlur={handleBlur}
          onChange={handleEditMode}
          ref={inputRef}
        />
      ) : (
        <Title>
          {order}.&nbsp;{title}
        </Title>
      )}
      <Icons>
        <StyledEdit>
          <Edit onClick={handleEdit} width="2rem" />
        </StyledEdit>
        <StyledDelete>
          <Delete width="2rem" onClick={handleDelete} />
        </StyledDelete>
      </Icons>
    </Container>
  );
};

export default Playlist;
