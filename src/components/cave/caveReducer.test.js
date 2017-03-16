import cave, { actions, selectors } from "./caveReducer";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";

describe("Cave Reducer", () => {
  it("Has an initial state", () => {
    const initial = cave(undefined, {});

    expect(selectors.getCaveMap(initial).length).toEqual(75);
    expect(selectors.getCaveMap(initial)[0].length).toEqual(75);
  });

  it("Returns the tile at a given map position", () => {
    const tile = { name: "PLAYER" };
    const initial = { caveMap: [[tile]] };

    expect(selectors.getTileAtPosition(initial, { pos: [0, 0] })).toEqual(tile);
  });

  it("Draws a character to the map", () => {
    const initial = cave(undefined, {});
    const action = {
      type: "cave/DRAW_TO_MAP",
      payload: { tile: {name: "PLAYER"}, pos: [0, 0] }
    };
    const after = cave(initial, action);

    expect(selectors.getCaveMap(after)[0][0].name).toEqual("PLAYER");
  });

  it("Removes a character from the map", () => {
    const initial = { caveMap: [[{name: "PLAYER"}]] };
    const action = {
      type: "cave/REMOVE_FROM_MAP",
      payload: { pos: [0, 0] }
    };
    const after = cave(initial, action);

    expect(selectors.getCaveMap(after)[0][0].name).toEqual("EMPTY");
  });
});
