import Tile from "./Tile";

describe("Tile", () => {
  it("intializes Tile with correct attributes", () => {
    const tile = new Tile({ name: "WALL" });

    expect(tile.name).toBe("WALL");
    expect(tile.glyph).toBe("#");
  });
});
