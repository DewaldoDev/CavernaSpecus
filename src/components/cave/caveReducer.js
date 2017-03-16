import { createActionCreators, createReducer } from "../../utils/reduxHelpers";
import { createCaveWalls } from "../../lib/buildCADungeon";
import Tile from "../../classes/Tile";

export const actions = createActionCreators({
  namespace: "cave",
  actions: [
    { name: "drawToMap" },
    { name: "removeFromMap" },
  ],
});

const initialState = {
  caveMap: createCaveWalls(),
};

const cave = createReducer({
  [actions.drawToMap]: (state, { pos, tile }) => ({
    ...state,
    caveMap: Object.assign([], state.caveMap, {[pos[0]]: {[pos[1]]: new Tile(tile)}})
  }),
  [actions.removeFromMap]: (state, { pos }) => ({
    ...state,
    caveMap: Object.assign([], state.caveMap, {[pos[0]]: {[pos[1]]: new Tile({name: "EMPTY"})}})
  }),
}, initialState);

export default cave;

export const selectors = {};

selectors.getCaveMap = state => state.caveMap;
selectors.getTileAtPosition = (state, { pos }) => state.caveMap[pos[0]][pos[1]]