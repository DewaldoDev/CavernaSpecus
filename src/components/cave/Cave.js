import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { selectors } from "../../rootReducer";
import Tile from "../tile/Tile";
import Player from "../player/Player";
import Creature from "../creature/Creature";

class Cave extends Component {
  static propTypes = {
    caveMap: PropTypes.array.isRequired,
    playerPosition: PropTypes.array.isRequired,
  };

  render () {
    const { caveMap, playerPosition } = this.props;

    return (
      <div>
        {caveMap.map((row, yPos) => (
          <div key={yPos}>
            {row.map((tile, xPos) => (
              xPos === playerPosition[0] && yPos === playerPosition[1] ? (
                <Player />
              ) : (
                <Tile
                  key={`${yPos},${xPos}`}
                  name={tile.name}
                />
              )
            ))}
          </div>
        ))}
        <div>
          <Creature />
        </div>
      </div>
    );
  }
};


const mapStateToProps = state => ({
  caveMap: selectors.getCaveMap(state),
  playerPosition: selectors.getPlayerPosition(state),
});

export default connect(mapStateToProps)(Cave);
