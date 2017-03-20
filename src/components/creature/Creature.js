import React, { Component } from "react";
import styled from "styled-components";
import { CREATURE_COLOURS, CREATURE_PATTERNS, SPECIES_BY_FAMILY } from "./config";
import { getRandomElementWithSeed, getRandomIndexWithSeed } from "../../lib/seed";

const StyledCreature = styled.span`
  margin: 10px;
  color: ${props => props.color};
`;

class Creature extends Component {
  constructor (props) {
    super(props);

    this.state = {
      family: getRandomIndexWithSeed(SPECIES_BY_FAMILY),
      color: getRandomElementWithSeed(CREATURE_COLOURS),
      pattern: getRandomElementWithSeed(CREATURE_PATTERNS),
    };
  }

  species = () => {
    const { family } = this.state;

    this._species =
      this._species ||
      getRandomElementWithSeed(SPECIES_BY_FAMILY[family].species);

    return this._species;
  }

  name = () => {
    const { color, pattern } = this.state;

    return `${color} ${pattern} ${this.species()}`;
  }

  glyph = () => {
    const { family } = this.state;

    return SPECIES_BY_FAMILY[family].glyph;
  }

  cssColor = () => {
    const { color } = this.state;

    return color.replace(" ", "");
  }

  render () {
    return (
      <StyledCreature
        color={this.cssColor()}
        title={this.name()}
      >
        {this.glyph()}
      </StyledCreature>
    );
  }
}

export default Creature;
