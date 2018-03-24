import { BACKGROUND_COLOUR } from "../../config";

export const TILE_NAME_TO_PROPERTIES = {
  EMPTY: {
    glyph: ".",
    backgroundColor: BACKGROUND_COLOUR,
    color: "#595959",
    passable: true,
  },
  WALL: {
    glyph: "#",
    backgroundColor: BACKGROUND_COLOUR,
    color: "#8d6e63",
    passable: false,
  },
  PLAYER: {
    glyph: "@",
    backgroundColor: BACKGROUND_COLOUR,
    color: "#fafafa",
    passable: false,
  },
};
