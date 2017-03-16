import { createActionCreators, createReducer } from "../../utils/reduxHelpers";

export const actions = createActionCreators({
  namespace: "player",
  actions: [
    { name: "updatePlayerPosition"}
  ],
});

const initialState = {
  playerPosition: [1, 1]
};

const player = createReducer({
  [actions.updatePlayerPosition]: (state, { pos }) => ({
    ...state,
    playerPosition: pos
  })
}, initialState);

export default player;

export const selectors = {};

selectors.getPlayerPosition = state => state.playerPosition;
