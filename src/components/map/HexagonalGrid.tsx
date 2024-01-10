import React, { useEffect, useMemo, useState } from "react";
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
import { readMapData, updateMapData, updatePartyPosition } from "../../features/firestore/MapDataDao";
import { Box } from "@mui/material";
import { rollDice } from "../../features/tables/DiceRoller";
import { randomEncounterDC, roadModifier } from "../../features/tables/RandomEncounter";

interface MapProps {
    role: Role;
    mapId: string;
    hexData: Record<string, MapHexData>,
    setHexData: React.Dispatch<React.SetStateAction<Record<string, MapHexData>>>
    setLevel: React.Dispatch<React.SetStateAction<number>>
}

const HexagonalGrid: React.FC<MapProps> = ({ role, mapId, hexData, setHexData, setLevel }) => {
    const hexagonLayout = GridGenerator.rectangle(29, 12);
    const hexagonSize = 79.92;

    const [partyPosition, setPartyPosition] = useState({ x: 0, y: 0 });
    const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
    const [selectedHex, setSelectedHex] = useState<Hex | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [encounterText, setEncounterText] = useState<String>("");

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
        const dragType = event.dataTransfer.getData("type");
        if (dragType !== "party") {
            return;
        }

        const boundingRect = event.currentTarget.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        setPartyPosition({
            x: boundingRect.x + scrollX + boundingRect.width / 2,
            y: boundingRect.y + scrollY + boundingRect.height / 2
        }
        );

        const hexData = hexToHexData(hex);
        if (hexData.state === HexplorationState.Unexplored) {
            hexData.state = HexplorationState.Travelled;
            updateHexData(hex, hexData);
        }

        handleDragEnd(hexData);
    };

    const unsubscribe = useMemo(() => {
        if (Object.keys(hexData).length === 0) {
            return readMapData(mapId, result => {
                const [data, pos, level] = result;
                setHexData(data as Record<string, MapHexData> ?? {});
                setPartyPosition(pos as { x: number, y: number });
                setLevel(level as number);
            });
        }
    }, []);

    function handleDragEnd(hexData: MapHexData): void {
        const encounterFlatCheck = rollDice(1, 20);
        const difficultyClass: number = randomEncounterDC[hexData?.terrainType as TerrainType] + (hexData?.roads ? roadModifier : 0);
        setEncounterText(`Rolled ${encounterFlatCheck}, DC is ${difficultyClass}. Encounter: ${(encounterFlatCheck >= difficultyClass ? "YES" : "NO")}`);
    }

    useEffect(() => {
        if (encounterText.length > 0) {
            const timeoutId = setTimeout(() => {
                setEncounterText("");
            }, 5000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [encounterText]);

    useEffect(() => {
        if (role === Role.GM && Object.keys(hexData).length !== 0) {
            if (unsubscribe !== undefined && loading) {
                unsubscribe();
                setLoading(false);
            } else {
                updateMapData(mapId, hexData).catch(console.error);
            }
        }
    }, [hexData]);

    useEffect(() => {
        if (role === Role.GM && partyPosition.x !== 0 && partyPosition.y !== 0 && !loading) {
            updatePartyPosition(mapId, partyPosition.x, partyPosition.y).catch(console.log);
        }
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
                            role={role}
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
            <div className="draggable-icon" style={{
                left: partyPosition.x,
                top: partyPosition.y,
            }}>
                <PartyToken />
                <Box style={{ position: "absolute", backgroundColor: "black" }}>{encounterText}</Box>
            </div>

        </div>
    );
};

export default HexagonalGrid;
