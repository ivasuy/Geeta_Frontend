import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #53443a;
  color: white;
`;

const Footer = ({ language }) => {
  const getTranslation = (englishText, hindiText) => {
    return language === "hindi" ? hindiText : englishText;
  };
  return (
    <FooterContainer>
      {getTranslation(
        "© 2024 Bhagavad Gita. All rights reserved.",
        "© 2024 श्रीमद्भगवद्गीता ज्ञान। सर्वाधिकार सुरक्षित।"
      )}
    </FooterContainer>
  );
};

export default Footer;
