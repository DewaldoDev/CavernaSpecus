import React, { Component, PropTypes } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { selectors } from "../../rootReducer";
import { actions as playerActions } from "../player/playerReducer";
import Tile from "../tile/Tile";
import Player from "../player/Player";
import Creature from "../creature/Creature";

const Container = styled.div`
  overflow: hidden;
`;

class Cave extends Component {
  static propTypes = {
    caveMap: PropTypes.array.isRequired,
    playerPosition: PropTypes.array.isRequired,
    onUpdatePlayerPosition: PropTypes.func.isRequired,
  };

  componentWillMount () {
    window.addEventListener("keypress", this.handleKeyPress, false);
  }

  handleKeyPress = ({ key }) => {
    const { playerPosition: p, onUpdatePlayerPosition } = this.props;
    switch (key) {
      case "a": // left
        onUpdatePlayerPosition({ pos: [p[0] - 1, p[1]] });
        break;

      case "w": // up
        onUpdatePlayerPosition({ pos: [p[0], p[1] - 1] });
        break;

      case "d": // right
        onUpdatePlayerPosition({ pos: [p[0] + 1, p[1]] });
        break;

      case "s": // down
        onUpdatePlayerPosition({ pos: [p[0], p[1] + 1] });
        break;

      default:
        // Do nothing
    }
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
        <div>
          <Creature />
        </div>
      </Container>
    );
  }
};


const mapStateToProps = state => ({
  caveMap: selectors.getCaveMap(state),
  playerPosition: selectors.getPlayerPosition(state),
});

export default connect(mapStateToProps, {
  onUpdatePlayerPosition: playerActions.updatePlayerPosition,
})(Cave);
