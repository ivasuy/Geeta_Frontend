import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  background-color: #f7f4f0;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 25%;
  height: 18%;
`;

const Title = styled.h2`
  padding: 0;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #ff7f50;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9551a;
  }
`;

const LanguageSelector = ({ onSelectLanguage }) => {
  return (
    <Overlay>
      <Dialog>
        <Title>Choose Your Preferred Language</Title>
        <ButtonContainer>
          <Button onClick={() => onSelectLanguage("english")}>English</Button>
          <Button onClick={() => onSelectLanguage("hindi")}>हिंदी</Button>
        </ButtonContainer>
      </Dialog>
    </Overlay>
  );
};

export default LanguageSelector;
