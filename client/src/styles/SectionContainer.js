import styled from 'styled-components';

export const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  border-radius: 5px;
  position: relative;
  margin-bottom: 30px;
  background-color: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  @media screen and (max-width: 900px) {
    width: 90%;
    flex-direction: column;
  }
`;
