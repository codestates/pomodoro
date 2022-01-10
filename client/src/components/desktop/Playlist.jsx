import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Edit } from '../../images/edit.svg';
import { ReactComponent as Delete } from '../../images/delete.svg';

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
  font-size: 1.5rem;
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

const Playlist = ({ order, name }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const handleBlur = () => {
    setEditMode(false);
  };

  const handleEditMode = () => {
    const newTitle = inputRef.current.value;
    setTitle(newTitle);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {};
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
          <Delete onClick={handleDelete} width="2rem" />
        </StyledDelete>
      </Icons>
    </Container>
  );
};

export default Playlist;
