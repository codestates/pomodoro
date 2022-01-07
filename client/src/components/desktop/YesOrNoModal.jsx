import React from 'react';
import { ModalContainer } from '../../styles/ModalContainer.styled';
import { ModalText } from '../../styles/ModalText.styled';
import { ModalBtn } from '../../styles/ModalBtn.styled';
import { Modal } from '../../styles/Modal.styled';
import styled from 'styled-components';

const Buttons = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`

const YesOrNoModal = ({text, handleModal, setYes}) => {
  const handleYes = () => {
    handleModal(false);
    setYes();
  }

  const handleNo = () => {
    handleModal(false);
  }

  return (
    <ModalContainer>
      <Modal>
        <ModalText>{text}</ModalText>
        <Buttons>
          <ModalBtn type='button' onClick={handleYes}>예</ModalBtn>
          <ModalBtn type='button' onClick={handleNo}>아니오</ModalBtn>
        </Buttons>
      </Modal>
    </ModalContainer>
  );
};

export default YesOrNoModal;