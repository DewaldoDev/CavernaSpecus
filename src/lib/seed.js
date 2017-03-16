import seedrandom from "seedrandom";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";

let TEST_SEED = seedrandom("TEST")();

let SEED = seedrandom()();

export const getRandomIndexWithSeed = (parent) => {
  const seed = process.env.NODE_ENV === "test" ? TEST_SEED : SEED;
  let indexFromSeed;
  
  if (isArray(parent)) {
    indexFromSeed = Math.floor(seed * (parent.length));
  } else if (isObject(parent)) {
    const keys = Object.keys(parent);
    indexFromSeed = keys[Math.floor(seed * (keys.length))];
  }

  if (process.env.NODE_ENV === "test") {
    TEST_SEED = seedrandom(TEST_SEED)();
  } else {
    SEED = seedrandom(SEED)();
  }

  return indexFromSeed;
};

export const getRandomElementWithSeed = (parent) => {
  const indexFromSeed = getRandomIndexWithSeed(parent);

  return parent[indexFromSeed];
};

