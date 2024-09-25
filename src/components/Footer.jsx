import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #53443a;
  color: white;
`;

const Footer = () => (
  <FooterContainer>
    <p>&copy; 2024 Bhagavad Gita. All rights reserved.</p>
  </FooterContainer>
);

export default Footer;
