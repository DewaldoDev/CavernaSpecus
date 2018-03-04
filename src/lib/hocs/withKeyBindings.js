import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { selectors } from "../../rootReducer";
import { actions as playerActions } from "../../components/player/playerReducer";
import { TILE_NAME_TO_PROPERTIES } from "../../components/tile/config";

const mapStateToProps = state => ({
  caveMap: selectors.getCaveMap(state),
  playerPosition: selectors.getPlayerPosition(state)
});

const withKeyBindings = () => Target =>
  connect(mapStateToProps, {
    onUpdatePlayerPosition: playerActions.updatePlayerPosition,
  })(
    class extends Component {
      static propTypes = {
        caveMap: PropTypes.arrayOf(PropTypes.array).isRequired,
        playerPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
        onUpdatePlayerPosition: PropTypes.func.isRequired
      };

      componentWillMount () {
        window.addEventListener("keypress", this.handleKeyPress, false);
      }

      isValidMove = ([x, y]) => {
        const { caveMap: c } = this.props;
        return TILE_NAME_TO_PROPERTIES[c[y][x].name].passable;
      };

      handleKeyPress = ({ key }) => {
        const {
          playerPosition: p,
          onUpdatePlayerPosition
        } = this.props;

        switch (key) {
          case "a": // left
            var pos = [p[0] - 1, p[1]]
            this.isValidMove(pos) && onUpdatePlayerPosition({ pos });
            break;

          case "w": // up
            var pos = [p[0], p[1] - 1];
            this.isValidMove(pos) && onUpdatePlayerPosition({ pos });
            break;

          case "d": // right
            var pos = [p[0] + 1, p[1]];
            this.isValidMove(pos) && onUpdatePlayerPosition({ pos });
            break;

          case "s": // down
            var pos = [p[0], p[1] + 1];
            this.isValidMove(pos) && onUpdatePlayerPosition({ pos });
            break;

          default:
            // Do nothing
        }
      };

      render() {
        return <Target {...this.props} />;
      }
    }
  );

export default withKeyBindings;
