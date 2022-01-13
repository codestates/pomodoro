import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100vw;
  height: ${({ height }) => height || '100vh'};
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    height: 120vh;
  }
`;
