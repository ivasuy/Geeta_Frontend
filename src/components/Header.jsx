import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: #53443a;
  color: white;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    margin: 0;
    font-size: 2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Header = () => (
  <HeaderContainer>
    <StyledLink to="/">
      <Title>Bhagavad Gita</Title>
    </StyledLink>
  </HeaderContainer>
);

export default Header;
