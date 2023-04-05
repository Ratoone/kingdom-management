import React, { useState } from 'react';
import { HexGrid, Layout, GridGenerator, Hex } from 'react-hexgrid';
import "./HexagonalGrid.css";
import map from '../database/map_no_label.jpg';
import { MapHexData, MapHexagon } from './MapHex';
import EditHexDataDialog from './HexEdit';
import { HexplorationState } from '../map/HexplorationState';
import { TerrainFeature } from '../map/TerrainFeature';

const HexagonalGrid: React.FC = () => {
  const hexagonLayout = GridGenerator.rectangle(29, 12);
  const hexagonSize = 2.787;

  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const [selectedHex, setSelectedHex] = useState<Hex | null>(null);
  const [hexData, setHexData] = useState<Record<string, MapHexData>>({});

  const handleHexClick = (event: React.MouseEvent<SVGElement, MouseEvent>, hex: Hex) => {
    const clickedHex = event.target as SVGElement;
    setDialogPosition(clickedHex.getBoundingClientRect());
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
            const data = hexData[hex.q + ',' + hex.r] ?? {
              level: 1,
              safe: false,
              state: HexplorationState.Unexplored,
              feature: TerrainFeature.None,
              roads: false
            };

            return <MapHexagon
              key={index + JSON.stringify(data)}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              hexData={data}
              onClick={(event) => handleHexClick(event, hex)}
            />
          })}
        </Layout>
      </HexGrid>
      {selectedHex && (
        <EditHexDataDialog
          open={true}
          style={{
            top: dialogPosition.top + 40 * hexagonSize,
            left: dialogPosition.left + 40 * hexagonSize
          }}
          key={selectedHex.q + ',' + selectedHex.r}
          hexData={hexData[selectedHex.q + ',' + selectedHex.r] ?? {
            level: 1,
            safe: false,
            state: HexplorationState.Unexplored,
            feature: TerrainFeature.None,
            roads: false
          }}
          onClose={handleDialogClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default HexagonalGrid;
