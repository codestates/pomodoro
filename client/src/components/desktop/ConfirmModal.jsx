import React from 'react';
import { ModalContainer } from '../../styles/ModalContainer.styled';
import { ModalText } from '../../styles/ModalText.styled';
import { ModalBtn } from '../../styles/ModalBtn.styled';
import { Modal } from '../../styles/Modal.styled';

export const ConfirmModal = ({ text, handleModal }) => {
  const handleClickContainer = (e) => {
    if (e.target.id === 'container') {
      handleModal(false);
    }
  };

  const handleClick = () => {
    handleModal(false);
  };

  return (
    <ModalContainer id="container" onClick={handleClickContainer}>
      <Modal>
        <ModalText>{text}</ModalText>
        <ModalBtn type="button" onClick={handleClick}>
          확인
        </ModalBtn>
      </Modal>
    </ModalContainer>
  );
};
