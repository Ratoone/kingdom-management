import React, { useState } from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, Hex } from 'react-hexgrid';
import "./HexagonalGrid.css";
interface HexagonalGridProps {
  width: number;
  height: number;
}

const HexagonalGrid: React.FC<HexagonalGridProps> = ({ width, height }) => {
  const [selectedHex, setSelectedHex] = useState<Hex | null>(null);

  const handleHexClick = (event: React.MouseEvent<SVGElement, MouseEvent>, hex: Hex) => {
    setSelectedHex(hex);
  };

  const hexagonLayout = GridGenerator.hexagon(3);

  return (
    <HexGrid width={width} height={height}>
      <Layout size={{ x: 10, y: 10 }} flat={false}>
        {hexagonLayout.map((hex, index) => (
          <Hexagon
            key={index}
            q={hex.q}
            r={hex.r}
            s={hex.s}
            fill={selectedHex?.q === hex.q && selectedHex?.r === hex.r ? '#00ff00' : '#ffffff'}
            onClick={(event) => handleHexClick(event, hex)}
            className="custom-hexagon"
          />
        ))}
      </Layout>
    </HexGrid>
  );
};

export default HexagonalGrid;
