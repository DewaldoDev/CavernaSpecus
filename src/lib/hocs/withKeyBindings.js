import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { selectors } from "../../rootReducer";
import { actions as playerActions } from "../../components/player/playerReducer";

const mapStateToProps = state => ({
  playerPosition: selectors.getPlayerPosition(state),
});

const withKeyBindings = () => Target =>
  connect(mapStateToProps, {
    onUpdatePlayerPosition: playerActions.updatePlayerPosition,
  })(
    class extends Component {
      static propTypes = {
        playerPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
        onUpdatePlayerPosition: PropTypes.func.isRequired
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

      render() {
        return <Target {...this.props} />;
      }
    }
  );

export default withKeyBindings;
