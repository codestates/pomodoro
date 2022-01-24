import styled from 'styled-components';

const DarkContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 300;
  display: grid;
  grid-template-rows: 1fr 9fr;
  align-items: center;
`;

const CloseWrapper = styled.div`
  justify-self: flex-end;
`;

const CloseButton = styled.div`
  width: 8vw;
  height: 8vw;
  font-style: normal;
  font-weight: bold;
  font-size: 3vw;
  color: white;
  text-align: right;
  margin-top: 2vw;
  margin-right: 2vw;
  cursor: pointer;
`;

const YoutubeIframe = styled.iframe`
  position: absolute;
  top: ${({ posY }) => posY}px;
  justify-self: center;
  width: 41.1rem;
  height: 29.1rem;
  border: none;
  border-radius: 0.5rem;
`;

const PreviewPopup = ({ URL, closeHandler, posY }) => {
  return (
    <DarkContainer>
      <CloseWrapper>
        <CloseButton onClick={closeHandler}>X</CloseButton>
      </CloseWrapper>
      <YoutubeIframe
        posY={posY}
        src={`https://www.youtube.com/embed/${URL}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></YoutubeIframe>
    </DarkContainer>
  );
};

export default PreviewPopup;
