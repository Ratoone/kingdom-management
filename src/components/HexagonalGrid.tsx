import React, { useState } from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, Hex } from 'react-hexgrid';
import "./HexagonalGrid.css";
import map from '../database/map_no_label.jpg';

const HexagonalGrid: React.FC = () => {
  const hexagonLayout = GridGenerator.rectangle(29, 12);
  const hexagonSize = 2.787;

  return (
    <div className='map-container'>
      <img src={map} alt="Kingdom Map" className='kingdom-image' />
      <HexGrid className='kingdom-map'>
        <Layout
          size={{ x: hexagonSize, y: hexagonSize }}
          flat={false}>
          {hexagonLayout.map((hex, index) => (
            <Hexagon
              key={index}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              fill={'transparent'}
              className="custom-hexagon"
            />
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
};

export default HexagonalGrid;
