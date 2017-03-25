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

});
