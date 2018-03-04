import { getMapSubset } from "./Cave";

const caveMap = new Array(60).fill(new Array(60).fill(null)).map((row, y) =>
  row.map((_, x) => (y * 60) + x + 1)
);

describe("getMapSubset()", () => {
  it("returns a 31 x 31 subset of the cave map", () => {
    const playerPosition = [30, 30];

    const { mapSubset } = getMapSubset(caveMap, playerPosition);

    expect(mapSubset.length).toEqual(31);
    expect(mapSubset[0].length).toEqual(31);
    expect(mapSubset[0][0]).toEqual(caveMap[14][14]);
    expect(mapSubset[30][30]).toEqual(caveMap[44][44])
  });

  it("returns correct map subset when close to top left", () => {
    const playerPosition = [10, 10];

    const { mapSubset } = getMapSubset(caveMap, playerPosition);

    expect(mapSubset.length).toEqual(31);
    expect(mapSubset[0].length).toEqual(31);
    expect(mapSubset[0][0]).toEqual(caveMap[0][0]);
    expect(mapSubset[30][30]).toEqual(caveMap[30][30]);
  });

  it("returns correct map subset when close to bottom right", () => {
    const playerPosition = [50, 50];

    const { mapSubset } = getMapSubset(caveMap, playerPosition);

    expect(mapSubset.length).toEqual(31);
    expect(mapSubset[0].length).toEqual(31);
    expect(mapSubset[0][0]).toEqual(caveMap[29][29]);
    expect(mapSubset[30][30]).toEqual(caveMap[59][59]);
  });

  it("updates map subset when player position changes", () => {
    const firstPlayerPosition = [30, 30];
    const { mapSubset: firstMapSubset } = getMapSubset(caveMap, firstPlayerPosition);
    const secondPlayerPosition = [31, 30];
    const { mapSubset: secondMapSubset } = getMapSubset(caveMap, secondPlayerPosition);

    expect(firstMapSubset[0][0]).toEqual(caveMap[14][14]);
    expect(secondMapSubset[0][0]).toEqual(caveMap[14][15]);
  });
});