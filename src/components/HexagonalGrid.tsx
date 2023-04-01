import React, { useState } from 'react';
import { HexGrid, Layout, GridGenerator, Hex } from 'react-hexgrid';
import "./HexagonalGrid.css";
import map from '../database/map_no_label.jpg';
import { MapHexData } from '../map/MapHex';
import { MapHexagon } from './MapHex';
import EditHexDataDialog from './HexEdit';

const HexagonalGrid: React.FC = () => {
  const hexagonLayout = GridGenerator.rectangle(29, 12);
  const hexagonSize = 2.787;

  const [selectedHex, setSelectedHex] = useState<Hex | null>(null);
  const [hexData, setHexData] = useState<Record<string, MapHexData>>({});

  const handleHexClick = (event: React.MouseEvent<SVGElement, MouseEvent>, hex: Hex) => {
    setSelectedHex(hex);
  };

  const handleDialogClose = () => {
    setSelectedHex(null);
  };

  const handleSave = (data: MapHexData) => {
    setHexData((prevData) => ({
      ...prevData,
      [selectedHex!.q + ',' + selectedHex!.r]: data
    }));
    setSelectedHex(null);
  };

  return (
    <div className='map-container'>
      <img src={map} alt="Kingdom Map" className='kingdom-image' />
      <HexGrid className='kingdom-map'>
        <Layout
          size={{ x: hexagonSize, y: hexagonSize }}
          flat={false}>
          {hexagonLayout.map((hex, index) => {
            const data = hexData[hex.q + ',' + hex.r] ?? { level: 1, cleared: false, state: '', feature: '', roads: false };

            return <MapHexagon
              key={index}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              hexData={data}
              fill={'transparent'}
              onClick={(event) => handleHexClick(event, hex)}
              className="custom-hexagon"
            />
          })}
        </Layout>
      </HexGrid>
      {selectedHex && (
        <EditHexDataDialog
          style={{
            position: "absolute",
            top: 50 * (selectedHex.r * hexagonSize * Math.sqrt(3) / 2),
            left: 50 * (selectedHex.q * hexagonSize + selectedHex.r * hexagonSize / 2)
          }}
          key={selectedHex.q + ',' + selectedHex.r}
          hexData={hexData[selectedHex.q + ',' + selectedHex.r] ?? { level: 1, cleared: false, state: '', feature: '', roads: false }}
          onClose={handleDialogClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default HexagonalGrid;
