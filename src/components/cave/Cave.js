import React, { PropTypes } from "react";
import Tile from "../tile/Tile";
import Creature from "../creature/Creature";

const Cave = ({ caveMap }) => (
  <div>
    {caveMap.map((row, yPos) => (
      <div key={yPos}>
        {row.map((tile, xPos) => (
          <Tile
            key={`${yPos},${xPos}`}
            name={tile.name}
          />
        ))}
      </div>
    ))}
    <div>
      <Creature />
    </div>
  </div>
);

Cave.propTypes = {
  caveMap: PropTypes.array.isRequired
};

export default Cave;
