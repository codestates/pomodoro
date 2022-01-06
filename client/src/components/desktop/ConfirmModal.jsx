import React from 'react';
import { ModalContainer } from '../../styles/ModalContainer.styled';
import { ModalText } from '../../styles/ModalText.styled';
import { ModalBtn } from '../../styles/ModalBtn.styled';
import { Modal } from '../../styles/Modal.styled';

const ConfirmModal = ({ text, handleModal }) => {
  const handleClick = () => {
    handleModal(false);
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalText>{text}</ModalText>
        <ModalBtn onClick={handleClick}>확인</ModalBtn>
      </Modal>
    </ModalContainer>
  );
};

export default ConfirmModal;
