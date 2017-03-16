import player, { actions, selectors } from "./playerReducer";

describe("Player Reducer", () => {
  it("has an initial state", () => {
    const initial = player(undefined, {});

    expect(selectors.getPlayerPosition(initial)).toEqual([1, 1]);
  });

  it("updates player position", () => {
    const initial = player(undefined, {});
    const action = {
      type: "player/UPDATE_PLAYER_POSITION",
      payload: { pos: [1, 2] }
    };
    const after = player(initial, action);

    expect(selectors.getPlayerPosition(after)).toEqual([1, 2]);
  });
});
