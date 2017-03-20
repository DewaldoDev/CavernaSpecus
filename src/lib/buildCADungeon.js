import find from "lodash/find";
import findIndex from "lodash/findIndex";
import last from "lodash/last";
import { CAVE_HEIGHT, CAVE_WIDTH } from "../config";

const WALL_TO_SPACE_RATIO = 0.6;
const WALL_SMOTHING_ITERATIONS = 5;

export const createCaveWalls = () => {
  const cave = Array(CAVE_HEIGHT).fill().map(() => Array(CAVE_WIDTH).fill("."));
  const seededCave = cave.map(row => (
    row.map(glyph => (
      Math.random() > WALL_TO_SPACE_RATIO ? "#" : "."
    ))
  ));
  const smoothedCave = smoothCaveWalls(seededCave, WALL_SMOTHING_ITERATIONS);
  return convertGlyphsToTileObjects(smoothedCave);
};

// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by over-population.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

export const smoothCaveWalls = (cave, times) => {

  let smoothedCave = cave.map((row, xPos) => row.map((tile, yPos) => {
    const isWall = tile === "#";
    const neighbours = calculateNeighbouringWalls(xPos, yPos, cave);

    if ((isWall && neighbours < 2) || (isWall && neighbours > 3)) {
      return ".";
    } else if (!isWall && neighbours === 3) {
      return "#";
    }
    return tile;
    
  }));

  //Edge cells are always walls
  if (times === 1) {
    return smoothedCave = smoothedCave.map((row, xPos) => row.map((tile, yPos) => {
      if (xPos === 0 || yPos === 0 || xPos === cave.length - 1 || yPos === cave[xPos].length - 1) {
        return "#";
      }
      return tile;
      
    }));
  }
  return smoothCaveWalls(smoothedCave, times-1);
};

export const calculateNeighbouringWalls = (xPos, yPos, cave) => {
  let neighbours = 0;
  const isWall = cave[xPos][yPos] === "#";

  cave.slice(
    xPos - 1 >= 0 ? xPos - 1 : 0,
    xPos + 2 < cave.length ? xPos + 2 : cave.length
  ).forEach(row => row.forEach((tile, index) => {
    if (index > yPos + 1 || index < yPos - 1) { return; }
    if (tile === "#") { neighbours += 1; }
  }));

  return isWall ? neighbours - 1 : neighbours;
};

export const calculateCaveSections = (cave, startPos) => {
  const caveObject = cave.map(row => row.map(tile => (
    {visited: tile === "#", enclosed: tile === "#"}
  )));

  const exploreOrthagonalTiles = positions => {
    positions.forEach(group => console.log(group));

    // If all tiles are visited, end the recursion
    if (!find(caveObject, row => find(row, tile => !tile.visited))) {
      return positions;
    }

    let newPositions = positions.slice();
    let allPositionsEnclosed = true;

    // For each coordinate in the current cluster, explore all coordinates surrounding
    last(positions).forEach(p => {
      if (caveObject[p[0], p[1]].enclosed) { return; }

      if (p[0] !== 0 && !caveObject[p[0] - 1][p[1]].visited) {
        allPositionsEnclosed = false;
        caveObject[p[0] - 1][p[1]].visited = true;
        last(newPositions).push([p[0] - 1, p[1]]);
      }

      if (p[0] !== (caveObject.length - 1) && !caveObject[p[0] + 1][p[1]].visited) {
        allPositionsEnclosed = false;
        caveObject[p[0] + 1][p[1]].visited = true;
        last(newPositions).push([p[0] + 1, p[1]]);
      }

      if (p[1] !== 0 && !caveObject[p[0]][p[1] - 1].visited) {
        allPositionsEnclosed = false;
        caveObject[p[0]][p[1] - 1].visited = true;
        last(newPositions).push([p[0], p[1] - 1]);
      }

      if (p[1] !== (caveObject[p[0]].length - 1) && !caveObject[p[0]][p[1] + 1].visited) {
        allPositionsEnclosed = false;
        caveObject[p[0]][p[1] + 1].visited = true;
        last(newPositions).push([p[0], p[1] + 1]);
      }

      caveObject[p[0]][p[1]].enclosed = true;
    });

    if (allPositionsEnclosed) {
      const nextYPos = findIndex(caveObject, row => find(row, tile => !tile.visited));
      const nextXPos = findIndex(caveObject[nextYPos], tile => !tile.visited);

      caveObject[nextXPos][nextYPos].visited = true;
      newPositions.push([[nextXPos, nextYPos]]);
    }

    newPositions.forEach(group => console.log(group));
    if (positions[0].length === 1) {
      return exploreOrthagonalTiles(newPositions);
    }
    return newPositions;
  };

  return exploreOrthagonalTiles([[startPos]]);
};

export const convertGlyphsToTileObjects = cave => (
  cave.map(row => row.map(tile =>(
    tile === "#" ? {name: "WALL"} : {name: "EMPTY"}
  )))
);
