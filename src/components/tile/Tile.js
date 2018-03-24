import React, { Component, PropTypes } from "react";
import styled from "styled-components";
import { TILE_NAME_TO_PROPERTIES } from "./config";

const StyledTile = styled.span`
  margin: 6px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
`;

class Tile extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render () {
    const {
      glyph,
      backgroundColor,
      color,
    } = TILE_NAME_TO_PROPERTIES[this.props.name];

    return (
      <StyledTile
        backgroundColor={backgroundColor}
        color={color}
      >
        {glyph}
      </StyledTile>
    );
  }
};

export default Tile;
