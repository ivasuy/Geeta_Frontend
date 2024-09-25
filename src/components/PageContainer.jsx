import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  flex: 1;
`;

const PageContainer = ({ children }) => (
  <Container>
    <Header />
    <MainContent>{children}</MainContent>
    <Footer />
  </Container>
);

export default PageContainer;
