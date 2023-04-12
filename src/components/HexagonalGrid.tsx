import React, { useEffect, useState } from 'react';
import { HexGrid, Layout, GridGenerator, Hex } from 'react-hexgrid';
import "./HexagonalGrid.scss";
import map from '../database/map_no_label.jpg';
import { MapHexData, MapHexagon } from './MapHex';
import EditHexDataDialog from './HexEdit';
import { HexplorationState } from '../map/HexplorationState';
import { TerrainFeature } from '../map/TerrainFeature';
import { TerrainType } from '../map/TerrainType';

const HexagonalGrid: React.FC = () => {
  const hexagonLayout = GridGenerator.rectangle(29, 12);
  const hexagonSize = 79.92;

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

  const hexToHexData = (hex: Hex): MapHexData => {
    return hexData[hex.q + ',' + hex.r] ?? defaultHex;
  }

  useEffect(() => {
    if (Object.keys(hexData).length === 0) {
      setHexData(JSON.parse(localStorage.getItem("hexMapData") || "{}"))
    }
  }, []);

  useEffect(() => {
    if (Object.keys(hexData).length !== 0) {
      localStorage.setItem("hexMapData", JSON.stringify(hexData, null, 4))
    }
  }, [hexData]);

  const defaultHex = {
    level: 20,
    safe: false,
    state: HexplorationState.Unexplored,
    feature: TerrainFeature.None,
    roads: "",
    terrainType: TerrainType.Plains,
    hidden: false,
    reference: ""
  }

  return (
    <div className='map-container'>
      <img src={map} alt="Kingdom Map" className='kingdom-image' />
      <HexGrid width="100%" height="100%" viewBox='-23.6 -87 4096 1447' className='kingdom-map'>
        <Layout
          size={{ x: hexagonSize, y: hexagonSize }}
          flat={false}
          spacing={1.01}>
          {hexagonLayout.map((hex, index) => {
            const data = hexToHexData(hex);

            return <MapHexagon
              key={index}
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
            top: dialogPosition.top + 1.5 * hexagonSize,
            left: dialogPosition.left + 1.5 * hexagonSize
          }}
          hexData={hexData[selectedHex.q + ',' + selectedHex.r] ?? defaultHex}
          onClose={handleDialogClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default HexagonalGrid;
