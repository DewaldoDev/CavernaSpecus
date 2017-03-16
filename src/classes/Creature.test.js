import Creature from "./Creature";

describe("Creature", () => {
  it("is initialized with proper attributes", () => {
    const creature = new Creature();

    expect(creature.family).toBe("ursidae");
    expect(creature.color).toBe("beige");
    expect(creature.pattern).toBe("freckled");
    expect(creature.species).toBe("bear");
    expect(creature.name).toBe("beige freckled bear");
    expect(creature.glyph).toBe("B");
  });
});
