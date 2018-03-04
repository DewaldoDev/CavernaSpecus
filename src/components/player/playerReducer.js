import { createActionCreators, createReducer } from "../../utils/reduxHelpers";
import { PLAYER_STARTING_POS, CAVE_HEIGHT, CAVE_WIDTH } from "../../config";

export const actions = createActionCreators({
  namespace: "player",
  actions: [
    { name: "updatePlayerPosition"}
  ],
});

const initialState = {
  playerPosition: PLAYER_STARTING_POS
};

const isValidPosition = ([x, y]) =>
  x > 0 && y > 0 && x < CAVE_WIDTH && y < CAVE_HEIGHT;

const player = createReducer({
  [actions.updatePlayerPosition]: (state, { pos }) =>
    isValidPosition(pos) ? {
      ...state,
      playerPosition: pos
    } : state
}, initialState);

export default player;

export const selectors = {};

selectors.getPlayerPosition = state => state.playerPosition;
