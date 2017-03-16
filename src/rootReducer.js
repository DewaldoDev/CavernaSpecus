import { combineReducers } from "redux";
import keys from "lodash/keys";

import cave, { selectors as caveSelectors } from "./components/cave/caveReducer";
import player, { selectors as playerSelectors } from "./components/player/playerReducer";

export default combineReducers({
  cave,
  player,
});

const IMPORTED_SELECTORS = [
  { moduleSelectors: caveSelectors, namespace: "cave" },
  { moduleSelectors: playerSelectors, namespace: "player" },
];

export const selectors = {};

IMPORTED_SELECTORS.forEach(({ moduleSelectors, namespace }) => {
  keys(moduleSelectors).forEach(name => {
    selectors[name] = (state, ...rest) => moduleSelectors[name](state[namespace], ...rest);
  });
});
