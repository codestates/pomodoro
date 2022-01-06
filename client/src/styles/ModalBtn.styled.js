import styled from 'styled-components';

export const ModalBtn = styled.button`
  outline: none;
  border: none;
  background-color: var(--color-button);
  border-radius: 30px;
  text-align: center;
  padding: 0.5em 1.5em;
  font-size: 1.6rem;
  letter-spacing: 0.2em;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  &:hover {
    transform: scale(0.9);
    transition: 250ms;
  }
`;
