import styled from 'styled-components';

export const FormBtn = styled.button`
  outline: none;
  height: 35px;
  width: 90%;
  border-radius: 5px;
  background-color: #ea5248;
  font-weight: 500;
  border: none;
  font-size: 18px;
  margin-bottom: 10px;
  color: white;
  font-size: 1.7rem;

  &:active {
    transform: scale(0.9);
    transition-duration: 250ms;
  }
`;
