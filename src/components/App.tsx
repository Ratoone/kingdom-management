import {useEffect, useMemo, useState} from "react";
import { Role } from "./login/Role";
import HexagonalGrid from "./map/HexagonalGrid";
import LoginRegister from "./login/LoginRegister";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import OverlayAccordion from "./utils/OverlayAccordion";
import KingdomData from "./kingdom/KingdomData";
import { MapHexData } from "./map/MapHex";
import {CssBaseline, ThemeProvider, createTheme, Box} from "@mui/material";
import React from "react";
import {readMapData, updateMapData, updatePartyPosition} from "../features/firestore/MapDataDao";
import PartyToken from "./map/PartyToken";
import {Hex} from "react-hexgrid";
import {rollDice} from "../features/tables/DiceRoller";
import {randomEncounterDC, roadModifier} from "../features/tables/RandomEncounter";
import {TerrainType} from "../features/map/TerrainType";

// @ts-ignore
const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const App: React.FC = () => {
    const [role, setRole] = useState(Role.Unauthenticated);
    const [mapId, setMapId] = useState("");
    const [hexData, setHexData] = useState<Record<string, MapHexData>>({});
    const [level, setLevel] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [partyPosition, setPartyPosition] = useState({ x: 0, y: 0 });
    const [encounterText, setEncounterText] = useState<string>("");

    const handleLoadMap = (mapId: string, playerLogin: boolean) => {
        setRole(!playerLogin ? Role.GM : Role.Player);
        setMapId(mapId);

    };

    const unsubscribe = useMemo(() => {
        if (mapId === "") {
            return;
        }

        if (Object.keys(hexData).length === 0) {
            return readMapData(mapId, result => {
                const [data, pos, level] = result;
                setHexData(data as Record<string, MapHexData> ?? {});
                setPartyPosition(pos as { x: number, y: number });
                setLevel(level as number);
            });
        }
    }, [mapId]);

    const handleDrop = (event: React.DragEvent<HTMLElement>, hex: Hex, hexData: MapHexData) => {
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

        const encounterFlatCheck = rollDice(1, 20);
        const difficultyClass: number = randomEncounterDC[hexData?.terrainType as TerrainType] + (hexData?.roads ? roadModifier : 0);
        setEncounterText(`Rolled ${encounterFlatCheck}, DC is ${difficultyClass}. Encounter: ${(encounterFlatCheck >= difficultyClass ? "YES" : "NO")}`);
    };

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

    if (role === Role.Unauthenticated) {
        return <LoginRegister onLoadMap={handleLoadMap} />;
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <OverlayAccordion>
                <KingdomData mapId={mapId} hexData={hexData} level={level} gmView={role === Role.GM} />
            </OverlayAccordion>

            <ConditionalWrapper
                condition={role === Role.Player}
                // @ts-ignore
                wrapper={children =>
                    <TransformWrapper minScale={0.6} limitToBounds={false}>
                        <TransformComponent>
                            {children}
                        </TransformComponent>
                    </TransformWrapper>
                }>
                <HexagonalGrid role={role} hexData={hexData} setHexData={setHexData} droppedToken={handleDrop} />
                <div className="draggable-icon" style={{
                    left: partyPosition.x,
                    top: partyPosition.y,
                }}>
                    <PartyToken />
                    <Box style={{ position: "absolute", backgroundColor: "black" }}>{encounterText}</Box>
                </div>
            </ConditionalWrapper>
        </ThemeProvider>
    );
};

export default App;
