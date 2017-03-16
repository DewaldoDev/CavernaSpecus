const TILE_NAME_TO_PROPERTIES = {
  EMPTY: { glyph: ".", passable: true },
  WALL: { glyph: "#", passable: false },
  PLAYER: { glyph: "@", passable: false },
};

class Tile {
  constructor(args) {
    const { glyph, passable, hidden } = TILE_NAME_TO_PROPERTIES[args.name];

    this.name = args.name;
    this.glyph = glyph;
    this.passable = passable;
    this.hidden = hidden;
  }
};

export default Tile;
