import React, { useRef, useEffect, useState } from 'react';
import { FormContainer } from '../../styles/FormContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormInput } from '../../styles/FormInput.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { ReactComponent as Icon } from '../../images/tomato.svg';
import styled from 'styled-components';
import { FormErrorMsg } from '../../styles/FormErrorMsg.styled';
import { DeleteAccount } from '../../components/desktop/DeleteAccount';
import { ConfirmModal } from '../../components/desktop/ConfirmModal';
import { isValidPassword } from '../../validation/validation';
import axios from 'axios';

const SERVER_ENDPOINT =
  process.env.REACT_APP_ENDPOINT || window.location.origin;

const StyledIcon = styled.div`
  margin-bottom: 30px;
`;

const Header = styled.h1`
  font-size: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    width: 50%;
  }
`;

const Button = styled.button`
  border: none;
  background-color: #ea5248;
  color: white;
  border-radius: 5px;
  text-align: center;
  padding: 0.5em 1.5em;
  font-size: 1.5em;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  &:active {
    transform: scale(0.9);
    transition-duration: 250ms;
  }

  @media screen and (max-width: 900px) {
    width: auto;
    padding: 10px;
    margin-bottom: 10px;
  }
`;

const EditUserInfo = () => {
  const [open, setOpen] = useState({
    confirm: false,
    delete: false,
  });
  const [showErrMsg, setShowErrMsg] = useState({
    password: false,
    conformPassword: false,
  });
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const handlePasswordInput = () => {
    const pw = passwordRef.current.value;
    if (!isValidPassword(pw)) {
      setShowErrMsg({ ...showErrMsg, password: true });
    } else {
      setShowErrMsg({ ...showErrMsg, password: false });
    }
  };

  const handleConfirmPasswordInput = () => {
    const password = passwordRef.current.value;
    const cPassword = confirmPasswordRef.current.value;

    if (password === '' || cPassword === '') return;

    if (password !== cPassword) {
      setShowErrMsg({ ...showErrMsg, conformPassword: true });
    } else setShowErrMsg({ ...showErrMsg, conformPassword: false });
  };

  const handleEditBtn = async () => {
    const password = passwordRef.current.value;
    const cPassword = confirmPasswordRef.current.value;

    if (password === '' || cPassword === '') return;
    if (showErrMsg.password || showErrMsg.conformPassword) return;

    await axios
      .patch(
        `${SERVER_ENDPOINT}/api/users`,
        {
          password,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('Token')}` },
        }
      )
      .then((res) => {
        setOpen({ ...open, confirm: true });
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteBtn = () => {
    setOpen({ ...open, delete: true });
  };
  return (
    <>
      {open.delete ? <DeleteAccount setOpen={setOpen} /> : <></>}
      {open.confirm ? (
        <ConfirmModal text="??????????????? ?????????????????????." handleModal={setOpen} />
      ) : (
        <></>
      )}
      <FormContainer height="80vh">
        <Form>
          <StyledIcon>
            <Icon width="80px" />
          </StyledIcon>
          <Header>??????????????? ?????????????????????????</Header>
          <FormWrapper marginTop="40px">
            <FormInput
              type="password"
              placeholder="????????????"
              ref={passwordRef}
              onBlur={handlePasswordInput}
            />
            <FormErrorMsg show={showErrMsg.password}>
              ??????????????? 8??? ??????????????? ??????, ??????/?????????/?????????/??????????????? ??????
              ???????????? ?????????.
            </FormErrorMsg>
          </FormWrapper>
          <FormWrapper>
            <FormInput
              type="password"
              placeholder="???????????? ?????????"
              ref={confirmPasswordRef}
              onFocus={handleConfirmPasswordInput}
              onChange={handleConfirmPasswordInput}
            />
            <FormErrorMsg show={showErrMsg.conformPassword}>
              ??????????????? ???????????? ????????????.
            </FormErrorMsg>
          </FormWrapper>
          <Buttons>
            <Button onClick={handleEditBtn}>????????????</Button>
            <Button onClick={handleDeleteBtn}>????????????</Button>
          </Buttons>
        </Form>
      </FormContainer>
    </>
  );
};

export default EditUserInfo;
