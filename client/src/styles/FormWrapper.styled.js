import styled from 'styled-components';

export const FormWrapper = styled.li`
  margin-top: ${({ marginTop }) => marginTop || '0px'};
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
