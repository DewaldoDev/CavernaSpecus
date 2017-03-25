import { createActionCreators, createReducer } from "../../utils/reduxHelpers";
import { createCaveWalls } from "../../lib/buildCADungeon";

export const actions = createActionCreators({
  namespace: "cave",
  actions: [
    { name: "generateCaveMap" },
  ],
});

const initialState = {
  caveMap: createCaveWalls(),
};

const cave = createReducer({
  [actions.generateCaveMap]: (state) => ({
    ...state
  }),
}, initialState);

export default cave;

export const selectors = {};

selectors.getCaveMap = state => state.caveMap;
selectors.getTileAtPosition = (state, { pos }) => state.caveMap[pos[0]][pos[1]]
