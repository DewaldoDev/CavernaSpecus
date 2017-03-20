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

  constructor (props) {
    super(props);
    
    const { glyph, passable } = TILE_NAME_TO_PROPERTIES[props.name];

    this.state = {
      glyph,
      passable,
    };
  }

  render () {
    const { name } = this.props;
    const { glyph } = this.state;

    return (
      <StyledTile title={name}>
        {glyph}
      </StyledTile>
    );
  }
};

export default Tile;
