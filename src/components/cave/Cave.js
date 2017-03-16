import React, { PropTypes } from 'react';

const Cave = ({ caveMap }) => (
  <div>
    {caveMap.map((row, yPos) => (
      <div key={yPos}>
        {row.map((tile, xPos) => (
          <span style={{ margin: 10 }}>
            {tile.glyph}
          </span>
        ))}
      </div>
    ))}
  </div>
);

Cave.propTypes = {
  caveMap: PropTypes.array.isRequired
};

export default Cave;
