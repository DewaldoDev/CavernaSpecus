import { getRandomIndexWithSeed, getRandomElementWithSeed } from "./seed";
import values from "lodash/values";

/*global sinon,expect*/
const arr = [1, 2, 3, 4, 5, 6];
const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };

describe("getRandomIndexWithSeed()", () => {
  it("returns a single, pseudorandom index given an array", () => {
    const index = getRandomIndexWithSeed(arr);

    expect(index).toBe(5);
  });

  it("returns a single, pseudorandom key given an object", () => {
    const key = getRandomIndexWithSeed(obj);

    expect(key).toBe("a");
  });
});

describe("getRandomElementWithSeed()", () => {
  it("returns a single, psuedorandom element from an array", () => {
    const el = getRandomElementWithSeed(arr);

    expect(arr).toContain(el);
  });

  it("returns a known pseudorandom element given the same seed", () => {
    const el = getRandomElementWithSeed(arr);

    expect(el).toBe(1);
  });

  it("returns a different psudorandom element each time it's invoked", () => {
    const firstEl = getRandomElementWithSeed(arr);
    const secondEl = getRandomElementWithSeed(arr);

    expect(firstEl).toBe(5);
    expect(secondEl).toBe(4);
  });

  it("returns a single, pseudorandom element from an object", () => {
    const el = getRandomElementWithSeed(obj);

    expect(values(obj)).toContain(el);
  });
});
