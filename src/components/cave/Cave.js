import React, { Component, PropTypes } from "react";
import styled from "styled-components";
import flow from "lodash/flow";
import { connect } from "react-redux";
import { selectors } from "../../rootReducer";
import withKeyBindings from "../../lib/hocs/withKeyBindings";
import Tile from "../tile/Tile";
import Player from "../player/Player";

const Container = styled.div`
  overflow: hidden;
`;

class Cave extends Component {
  static propTypes = {
    caveMap: PropTypes.array.isRequired,
    playerPosition: PropTypes.array.isRequired
  };

  render () {
    const { caveMap, playerPosition } = this.props;

    return (
      <Container>
        {caveMap.map((row, yPos) => (
          <div key={yPos}>
            {row.map((tile, xPos) => (
              xPos === playerPosition[0] && yPos === playerPosition[1] ? (
                <Player
                  key={`${yPos},${xPos}`}
                />
              ) : (
                <Tile
                  key={`${yPos},${xPos}`}
                  name={tile.name}
                />
              )
            ))}
          </div>
        ))}
      </Container>
    );
  }
};


const mapStateToProps = state => ({
  caveMap: selectors.getCaveMap(state),
  playerPosition: selectors.getPlayerPosition(state),
});

export default flow([
  connect(mapStateToProps, {}),
  withKeyBindings()
])(Cave);
