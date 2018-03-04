import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { selectors } from "../../rootReducer";
import { actions as playerActions } from "../../components/player/playerReducer";

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

      handleKeyPress = ({ key }) => {
        const {
          caveMap: c,
          playerPosition: p,
          onUpdatePlayerPosition
        } = this.props;

        switch (key) {
          case "a": // left
            p[0] > 0 && onUpdatePlayerPosition({ pos: [p[0] - 1, p[1]] });
            break;

          case "w": // up
            p[1] > 0 && onUpdatePlayerPosition({ pos: [p[0], p[1] - 1] });
            break;

          case "d": // right
            p[0] < c.length - 1 && onUpdatePlayerPosition({ pos: [p[0] + 1, p[1]] });
            break;

          case "s": // down
            p[1] < c[0].length - 1 && onUpdatePlayerPosition({ pos: [p[0], p[1] + 1] });
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
