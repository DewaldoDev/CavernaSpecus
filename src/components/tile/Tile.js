import React, { Component, PropTypes } from "react";
import styled from "styled-components";
import { TILE_NAME_TO_PROPERTIES } from "./config";

const StyledTile = styled.span`
  margin: 10px;
`;

class Tile extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render () {
    const { glyph } = TILE_NAME_TO_PROPERTIES[this.props.name];

    return (
      <StyledTile>
        {glyph}
      </StyledTile>
    );
  }
};

export default Tile;
