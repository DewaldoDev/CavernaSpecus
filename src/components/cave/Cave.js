import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { selectors } from "../../rootReducer";
import { actions as caveActions } from "./caveReducer";
import Tile from "../tile/Tile";
import Creature from "../creature/Creature";

const Cave = ({ caveMap }) => (
  <div>
    {caveMap.map((row, yPos) => (
      <div key={yPos}>
        {row.map((tile, xPos) => (
          <Tile
            key={`${yPos},${xPos}`}
            name={tile.name}
          />
        ))}
      </div>
    ))}
    <div>
      <Creature />
    </div>
  </div>
);

Cave.propTypes = {
  caveMap: PropTypes.array.isRequired
};

const buildCaveMap = (state, caveMap, glyphs) => {
  Object.keys(glyphs).forEach(pos => {
    caveActions.drawToMap([pos], glyphs[pos])
  });

  return({ caveMap: selectors.getCaveMap(state) });
};

const mapStateToProps = state => {
  const caveMap = selectors.getCaveMap(state);
  const playerPosition = selectors.getPlayerPosition(state);
  const glyphs = {
    [playerPosition]: { name: "PLAYER" }
  };

  return buildCaveMap(state, caveMap, glyphs);
};

export default connect(mapStateToProps)(Cave);
