import React, { useEffect, useState } from "react";
import { HexGrid, Layout, GridGenerator, Hex } from "react-hexgrid";
import "./HexagonalGrid.scss";
import map from "../../assets/images/map_no_label.jpg";
import { MapHexData, MapHexagon } from "./MapHex";
import EditHexDataDialog from "./HexEdit";
import { HexplorationState } from "../../features/map/HexplorationState";
import { TerrainFeature } from "../../features/map/TerrainFeature";
import { TerrainType } from "../../features/map/TerrainType";
import PartyToken from "./PartyToken";
import { Role } from "../login/Role";
import { readMapData, updateMapData } from "../../features/firestore/MapDataDao";

interface MapProps {
    role: Role;
    mapId: string;
}

const HexagonalGrid: React.FC<MapProps> = ({role, mapId}) => {
    const hexagonLayout = GridGenerator.rectangle(29, 12);
    const hexagonSize = 79.92;

    const [partyPosition, setPartyPosition] = useState(() => {
        const storedPosition = localStorage.getItem("partyPosition");
        return !!storedPosition ? JSON.parse(storedPosition) : { x: 0, y: 0 };
    });
    const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
    const [selectedHex, setSelectedHex] = useState<Hex | null>(null);
    const [hexData, setHexData] = useState<Record<string, MapHexData>>(JSON.parse(localStorage.getItem("hexMapData") || "{}"));

    const handleHexClick = (event: React.MouseEvent<SVGElement, MouseEvent>, hex: Hex) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        setDialogPosition({
            top: boundingRect.top + boundingRect.height / 2,
            left: boundingRect.left + boundingRect.width / 2
        });
        setSelectedHex(hex);
    };

    const handleDialogClose = () => {
        setSelectedHex(null);
    };

    const handleSave = (data: MapHexData) => {
        updateHexData(selectedHex!, data);
        setSelectedHex(null);
    };

    const updateHexData = (hex: Hex, data: MapHexData) => {
        setHexData((prevData) => ({
            ...prevData,
            [hex.q + "," + hex.r]: data
        }));
    };

    const hexToHexData = (hex: Hex): MapHexData => {
        const defaultHex = {
            level: 20,
            safe: false,
            state: HexplorationState.Unexplored,
            feature: TerrainFeature.None,
            roads: "",
            terrainType: TerrainType.Plains,
            hidden: false,
            reference: ""
        };
        return hexData[hex.q + "," + hex.r] ?? defaultHex;
    };

    const handleDrop = (event: React.DragEvent<HTMLElement>, hex: Hex) => {
        event.preventDefault();
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        setPartyPosition({ 
            x: boundingRect.x + scrollX + boundingRect.width / 2, 
            y: boundingRect.y + scrollY + boundingRect.height / 2 }
        );

        const hexData = hexToHexData(hex);
        if (hexData.state === HexplorationState.Unexplored) {
            hexData.state = HexplorationState.Travelled;
        }

        updateHexData(hex, hexData);
    };

    useEffect(() => {
        if (Object.keys(hexData).length === 0) {
            readMapData(mapId).then(result => setHexData(result as Record<string, MapHexData>));
        }
        
        const storedPosition = localStorage.getItem("partyPosition");
        if (!!storedPosition) {
            setPartyPosition(JSON.parse(storedPosition));
        }
    }, []);

    useEffect(() => {
        if (Object.keys(hexData).length !== 0) {
            updateMapData(mapId, hexData).catch(console.error);
        }
    }, [hexData]);

    useEffect(() => {        
        localStorage.setItem("partyPosition", JSON.stringify(partyPosition, null, 4));
    }, [partyPosition]);

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
                            className="map-hex"
                            key={index}
                            q={hex.q}
                            r={hex.r}
                            s={hex.s}
                            hexData={data}
                            onClick={(event) => handleHexClick(event, hex)}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => role === Role.GM && handleDrop(e, hex)}
                        />;
                    })}
                </Layout>
            </HexGrid>
            {!!selectedHex && role === Role.GM && (
                <EditHexDataDialog
                    open={true}
                    style={{
                        top: dialogPosition.top,
                        left: dialogPosition.left
                    }}
                    hexData={hexToHexData(selectedHex)}
                    onClose={handleDialogClose}
                    onSave={handleSave}
                />
            )}
            <PartyToken x={partyPosition.x} y={partyPosition.y} />
        </div>
    );
};

export default HexagonalGrid;
