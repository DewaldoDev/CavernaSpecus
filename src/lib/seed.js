import seedrandom from "seedrandom";
import url from "url";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";

let { seed } = url.parse(window.location.href, true).query;
seed = process.env.NODE_ENV === "test" ? "TEST" : seed;

let SEED = seedrandom(seed)();

export const getRandomIndexWithSeed = (parent) => {
  let indexFromSeed;
  
  if (isArray(parent)) {
    indexFromSeed = Math.floor(SEED * (parent.length));
  } else if (isObject(parent)) {
    const keys = Object.keys(parent);
    indexFromSeed = keys[Math.floor(SEED * (keys.length))];
  }

  SEED = seedrandom(SEED)();

  return indexFromSeed;
};

export const getRandomElementWithSeed = (parent) => {
  const indexFromSeed = getRandomIndexWithSeed(parent);

  return parent[indexFromSeed];
};

