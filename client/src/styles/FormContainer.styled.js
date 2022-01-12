import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  height: ${({ height }) => height || '100vh'};
  display: flex;
  justify-content: center;
  align-items: center;
`;
