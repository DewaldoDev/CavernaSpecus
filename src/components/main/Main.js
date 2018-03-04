import React from "react";
import styled from "styled-components";
import Cave from "../cave/Cave";

const Frame = styled.div`
  display: inline-block;
  margin: 10px;
  border: 1px solid #fafafa;
`;

const Main = () =>
  <div>
    <Frame>
      <Cave />
    </Frame>
  </div>;

export default Main;
