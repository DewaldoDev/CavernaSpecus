import {
  calculateNeighbouringWalls,
  smoothCaveWalls,
  calculateCaveSections,
} from "./buildCADungeon";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";

describe("calculateNeighbouringWalls()", () => {
  it("returns the number of walls surrounding a non-edge glyph", () => {
    const cave = [[".", "#", "."], [".", "#", "."], [".", "#", "."]];

    const neighbouringWallCount = calculateNeighbouringWalls(2, 2, cave);

    expect(neighbouringWallCount).toBe(2);
  });

  it("returns the number of walls surrounding an edge glyph", () => {
    const cave = [["#", "#", "."], ["#", ".", "."], [".", ".", "."]];

    const neighbouringWallCount = calculateNeighbouringWalls(0, 0, cave);

    expect(neighbouringWallCount).toBe(2);
  });
});

describe("smoothCaveWalls()", () => {
  it("adds or removes walls according to CGoL rules", () => {
    const cave = [
      [".", ".", ".", ".", "."],
      [".", "#", ".", "#", "."],
      [".", "#", "#", ".", "."],
      [".", ".", ".", ".", "."],
    ];

    const smoothedCave = smoothCaveWalls(cave, 1);
    
    expect(smoothedCave).toEqual([
      ["#", "#", "#", "#", "#"],
      ["#", "#", ".", ".", "#"],
      ["#", "#", "#", ".", "#"],
      ["#", "#", "#", "#", "#"],
    ]);
  });
});

xdescribe("calculateCaveSections()", () => {
  it("returns an array of all contiguous connected positions", () => {
    const cave = [
      ["#", "#", "#", "#", "#"],
      ["#", ".", "#", ".", "#"],
      ["#", ".", "#", ".", "#"],
      ["#", "#", "#", "#", "#"],
    ];

    const caveCalculations = calculateCaveSections(cave, [1,1]);

    expect(caveCalculations).toEqual([
      [[1,1], [1,2]],
      [[3,1], [3,2]],
    ]);
  });
});
