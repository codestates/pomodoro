import React from 'react';
import { FormContainer } from '../../styles/FormContainer.styled';
import { Form } from '../../styles/Form.styled';
import { FormInput } from '../../styles/FormInput.styled';
import { FormWrapper } from '../../styles/FormWrapper.styled';
import { FormBtn } from '../../styles/FormBtn.styled';
import { FormErrorMsg } from '../../styles/FormErrorMsg.styled';
import { ReactComponent as Logo } from '../../images/logo.svg';

const SignUp = () => {
  return (
    <FormContainer>
      <Form>
        <Logo />
        <FormWrapper marginTop="40px">
          <FormInput placeholder="닉네임" />
          <FormErrorMsg>
            3~30자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.
          </FormErrorMsg>
        </FormWrapper>
        <FormWrapper>
          <FormInput placeholder="이메일" />
          <FormErrorMsg>올바른 이메일 형식이 아닙니다.</FormErrorMsg>
        </FormWrapper>
        <FormWrapper>
          <FormInput placeholder="비밀번호" />
          <FormErrorMsg>
            8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야
            합니다.
          </FormErrorMsg>
        </FormWrapper>
        <FormWrapper>
          <FormInput placeholder="비밀번호 재입력" />
          <FormErrorMsg>비밀번호가 일치하지 않습니다.</FormErrorMsg>
        </FormWrapper>
        <FormBtn disabled>가입하기</FormBtn>
      </Form>
    </FormContainer>
  );
};

export default SignUp;
