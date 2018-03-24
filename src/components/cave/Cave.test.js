import { getMapSubset } from "./Cave";

const caveMap = new Array(60).fill(new Array(60).fill(null)).map((row, y) =>
  row.map((_, x) => (y * 60) + x + 1)
);

describe("getMapSubset()", () => {
  it("returns a 49 x 27 subset of the cave map", () => {
    const playerPosition = [30, 30];

    const { mapSubset } = getMapSubset(caveMap, playerPosition);

    expect(mapSubset.length).toEqual(27);
    expect(mapSubset[0].length).toEqual(49);
    expect(mapSubset[0][0]).toEqual(caveMap[16][5]);
    expect(mapSubset[26][48]).toEqual(caveMap[42][53])
  });

  it("returns correct map subset when close to top left", () => {
    const playerPosition = [10, 10];

    const { mapSubset } = getMapSubset(caveMap, playerPosition);

    expect(mapSubset.length).toEqual(27);
    expect(mapSubset[0].length).toEqual(49);
    expect(mapSubset[0][0]).toEqual(caveMap[0][0]);
    expect(mapSubset[26][48]).toEqual(caveMap[26][48]);
  });

  it("returns correct map subset when close to bottom right", () => {
    const playerPosition = [50, 50];

    const { mapSubset } = getMapSubset(caveMap, playerPosition);

    expect(mapSubset.length).toEqual(27);
    expect(mapSubset[0].length).toEqual(49);
    expect(mapSubset[0][0]).toEqual(caveMap[33][11]);
    expect(mapSubset[26][48]).toEqual(caveMap[59][59]);
  });

  it("updates map subset when player position changes", () => {
    const firstPlayerPosition = [30, 30];
    const { mapSubset: firstMapSubset } = getMapSubset(caveMap, firstPlayerPosition);
    const secondPlayerPosition = [31, 30];
    const { mapSubset: secondMapSubset } = getMapSubset(caveMap, secondPlayerPosition);

    expect(firstMapSubset[0][0]).toEqual(caveMap[16][5]);
    expect(secondMapSubset[0][0]).toEqual(caveMap[16][6]);
  });
});