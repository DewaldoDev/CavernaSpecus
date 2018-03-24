import React from "react";
import styled from "styled-components";
import Cave from "../cave/Cave";
import StatusBar from "./StatusBar";

const Container = styled.div`
  display: flex;
`;

const CaveContainer = styled.div`
  display: inline-block;
  margin: 10px;
  border: 1px solid #fafafa;
`;

const StatusBarContainer = CaveContainer.extend`
  margin-left: 0;
  width: 100%;
`;

const Main = () =>
  <Container>
    <CaveContainer>
      <Cave />
    </CaveContainer>
    <StatusBarContainer>
      <StatusBar />
    </StatusBarContainer>
  </Container>;

export default Main;
