import styled from 'styled-components';

export const FormErrorMsg = styled.span`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  height: 3rem;
  color: #d66258;
  width: ${({ width }) => width || '90%'};
  margin-top: 5px;
  font-size: 1.3rem;

  @media screen and (max-width: 768px) {
    height: 4.5rem;
  }
`;
