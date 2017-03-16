import { getRandomElementWithSeed, getRandomIndexWithSeed } from "../lib/seed";

const CREATURE_COLOURS = [
  "alice blue", "antique white", "aquamarine", "azure", "beige", "bisque", "black",
  "blanched almond", "blue", "blue violet", "brown", "cadet blue", "chartreuse",
  "chocolate", "coral", "cornflower blue", "crimson", "cyan", "dark blue", "dark cyan",
  "dark goldenrod", "dark green", "dark grey", "dark khaki", "dark magenta", "dark olive green",
  "dark orange", "dark orchid", "dark red", "dark salmon", "dark sea green", "dark slate blue",
  "dark slate grey", "dark turquoise", "dark violet", "deep pink", "deep sky blue", "dim grey",
  "floral white", "forest green", "fuchsia", "gainsboro", "ghost white", "gold", "goldenrod",
  "grey", "green", "green yellow", "honeydew", "hot pink", "indigo", "ivory", "khaki", "lavender",
  "lavender blush", "lemon chiffon", "light blue", "light coral", "light cyan", "light goldenrod yellow",
  "light green", "light grey", "light pink", "light salmon", "light sea green", "light sky blue",
  "light slate grey", "light steel blue", "light yellow", "lime green", "magenta", "maroon",
  "misty rose", "moccasin", "navy", "olive", "olive drab", "orange", "orange red", "pale goldenrod",
  "pale green", "pale turquoise", "pale violet red", "papaya whip", "pink", "plum", "powder blue",
  "purple", "red","rosy brown", "royal blue", "saddle brown", "sandy brown", "sea green",
  "sienna", "silver", "sky blue", "slate blue", "slate grey", "spring green", "steel blue",
  "tan", "teal", "turquoise", "violet", "white","yellow", "yellow green",
];

const CREATURE_PATTERNS = [
  "armed", "backed", "banded", "bellied", "blotched", "bodied", "breasted", "dashed", "checkered",
  "cheeked", "dabbed", "dotted", "eared", "feathered", "footed", "freckled", "furred", "headed",
  "hooded", "horned", "lined", "marked", "masked", "mottled", "naped", "necked", "patched", "pocked",
  "ridged", "rimmed", "rumped", "scaled", "shouldered", "sided", "spattered", "speckled", "spined",
  "spotted", "splashed", "sprinkled", "stippled", "streaked", "striped", "studded", "tailed", "tipped",
  "trimmed",
];

const SPECIES_BY_FAMILY = {
  amphibian: {
    glyph: "a",
    species: ["frog", "newt", "salamander", "turtle"],
  },
  bird: {
    glyph: "b",
    species: ["cassowary", "chicken", "emu", "kiwi", "ostrich", "penguin"],
  },
  bovidae: {
    glyph: "C",
    species: ["antelope", "bison", "buffalo", "cow", "gazelle", "goat", "ox", "sheep", "yak"],
  },
  canidae: {
    glyph: "d",
    species: ["coyote", "dog", "fox", "jackal", "wolf"],
  },
  cervidae: {
    glyph: "D",
    species: ["deer", "elk", "moose", "reindeer"],
  },
  diprotodontia: {
    glyph: "M",
    species: ["kangaroo", "koala", "opossum", "wallaby", "wombat"],
  },
  felidae: {
    glyph: "c",
    species: ["cat", "cheetah", "leopard", "lion", "lynx", "panther", "tiger"],
  },
  insectivora: {
    glyph: "i",
    species: ["hedgehog", "mole", "shrew"],
  },
  lagomorph: {
    glyph: "R",
    species: ["cony", "hare", "pika", "rabbit"],
  },
  monotremata: {
    glyph: "m",
    species: ["echidna", "platypus"],
  },
  mustelidae: {
    glyph: "w",
    species: ["badger", "ferret", "mink", "otter", "weasel", "wolverine"],
  },
  lizard: {
    glyph: "l",
    species: ["chameleon", "gecko", "iguana", "lizard"],
  },
  perissodactyl: {
    glyph: "h",
    species: ["donkey", "horse", "mule", "pony", "rhino", "tapir"],
  },
  primate: {
    glyph: "P",
    species: ["ape", "baboon", "chimpanzee", "gibbon", "gorilla", "loris", "monkey", "orangutan"],
  },
  rodentia: {
    glyph: "r",
    species: ["beaver", "capybara", "chinchilla", "mouse", "porcupine", "rat", "squirrel"],
  },
  snake: {
    glyph: "S",
    species: ["cobra", "python", "snake", "viper"],
  },
  suiformes: {
    glyph: "p",
    species: ["boar", "hippo", "peccary", "pig"],
  },
  ursidae: {
    glyph: "B",
    species: ["bear", "panda"],
  },
  xenarthra: {
    glyph: "s",
    species: ["anteater", "armadillo", "sloth"],
  },
};

class Creature {
  constructor (args) {
    this.family = getRandomIndexWithSeed(SPECIES_BY_FAMILY);
    this.color = getRandomElementWithSeed(CREATURE_COLOURS);
    this.pattern = getRandomElementWithSeed(CREATURE_PATTERNS);
  }

  get species () {
    this._species =
      this._species ||
      getRandomElementWithSeed(SPECIES_BY_FAMILY[this.family].species);

    return this._species;
  }

  get name () {
    return `${this.color} ${this.pattern} ${this.species}`;
  }

  get glyph () {
    return SPECIES_BY_FAMILY[this.family].glyph;
  }

  get cssColor () {
    return this.color.replace(" ", "");
  }
}

export default Creature;
