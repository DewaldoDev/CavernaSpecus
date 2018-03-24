import React, { Component, PropTypes } from "react";
import styled from "styled-components";
import flow from "lodash/flow";
import { connect } from "react-redux";
import { selectors } from "../../rootReducer";
import { BACKGROUND_COLOUR } from "../../config";
import withKeyBindings from "../../lib/hocs/withKeyBindings";
import Tile from "../tile/Tile";
import Player from "../player/Player";

const Container = styled.div`
  background-color: ${BACKGROUND_COLOUR};
`;

export const getMapSubset = (map, p) => {
  const SUBSET_WIDTH = 48;
  const SUBSET_HEIGHT = 26;
  const MAX_LEFT_X = map[0].length - SUBSET_WIDTH - 1;
  const MAX_TOP_Y = map.length - SUBSET_HEIGHT - 1;

  const leftX =
    getOffsetPosition(p[0] - (SUBSET_WIDTH/2) - 1, 0, MAX_LEFT_X);

  const rightX =
    getOffsetPosition(p[0] + (SUBSET_WIDTH/2), SUBSET_WIDTH + 1, map[0].length);

  const topY =
    getOffsetPosition(p[1] - (SUBSET_HEIGHT/2) - 1, 0, MAX_TOP_Y);

  const bottomY =
    getOffsetPosition(p[1] + (SUBSET_HEIGHT/2), SUBSET_HEIGHT + 1, map.length);

  return ({
    leftX,
    topY,
    mapSubset: map.slice(topY, bottomY).map(mapSlice => mapSlice.slice(leftX, rightX))
  });
};

const getOffsetPosition = (pos, min, max) =>
  Math.max(Math.min(pos, max), min);

class Cave extends Component {
  static propTypes = {
    caveMap: PropTypes.array.isRequired,
    playerPosition: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = getMapSubset(props.caveMap, props.playerPosition)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getMapSubset(nextProps.caveMap, nextProps.playerPosition));
  }

  render () {
    const { playerPosition: p } = this.props;
    const { leftX, topY, mapSubset } = this.state;

    return (
      <Container>
        {mapSubset.map((row, yPos) => (
          <div key={yPos}>
            {row.map((tile, xPos) =>
              <CaveTile
                key={`${xPos}-${yPos}`}
                xPos={xPos}
                yPos={yPos}
                playerPos={[p[0] - leftX, p[1] - topY]}
                name={tile.name}
              />
            )}
          </div>
        ))}
      </Container>
    );
  }
};

const CaveTile = ({ xPos, yPos, playerPos, ...props }) => {
  if (xPos === playerPos[0] && yPos === playerPos[1]) {
    return <Player />;
  } else {
    return <Tile {...props} />;
  }
}

const mapStateToProps = state => ({
  caveMap: selectors.getCaveMap(state),
  playerPosition: selectors.getPlayerPosition(state),
});

export default flow([
  connect(mapStateToProps, {}),
  withKeyBindings()
])(Cave);
