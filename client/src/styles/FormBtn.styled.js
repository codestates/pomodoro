import styled from 'styled-components';

export const FormBtn = styled.button`
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

  &:disabled {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.9);
    transition-duration: 250ms;
  }
`;
