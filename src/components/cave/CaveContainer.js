import React from "react";
import { connect } from "react-redux";
import { selectors } from "../../rootReducer";
import { actions as caveActions } from "./caveReducer";
import Cave from "./Cave";

const CaveContainer = props => <Cave {...props} />;

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
}

export default connect(mapStateToProps)(CaveContainer);
