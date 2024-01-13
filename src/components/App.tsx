import { useEffect, useMemo, useState } from "react";
import { Role } from "./login/Role";
import HexagonalGrid from "./map/HexagonalGrid";
import LoginRegister from "./login/LoginRegister";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import OverlayAccordion from "./utils/OverlayAccordion";
import KingdomData from "./kingdom/KingdomData";
import { MapHexData } from "./map/MapHex";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { readMapData, updateMapData, updatePartyPosition } from "../features/firestore/MapDataDao";
import { Hex } from "react-hexgrid";
import { TokenOverlay } from "./map/TokenOverlay";
import { TokenPosition } from "../features/map/TokenPosition";
import { Army } from "../features/warfare/Army";
import { updateArmy } from "../features/firestore/WarfareDao";

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
    const [partyPosition, setPartyPosition] = useState<TokenPosition>({ x: 0, y: 0, q: -1, r: -1 });
    const [armies, setArmies] = useState<Army[]>([]);

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
                setPartyPosition(pos as TokenPosition);
                setLevel(level as number);
            });
        }
    }, [mapId]);



    const handleDrop = (event: React.DragEvent<HTMLElement>, hex: Hex) => {
        event.preventDefault();
        const dragType = event.dataTransfer.getData("type");
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const draggedLocation = {
            x: boundingRect.x + scrollX + boundingRect.width / 2,
            y: boundingRect.y + scrollY + boundingRect.height / 2,
            q: hex.q,
            r: hex.r
        };

        if (dragType === "party") {
            setPartyPosition(draggedLocation);
        }

        if (dragType === "army") {
            const armyId = event.dataTransfer.getData("entityId");
            const army = armies.find(armyIt => armyIt.id === armyId);
            if (!army) {
                return;
            }

            army.position = draggedLocation;

            updateArmy(army).then(() => {
                setArmies(armies.map(oldArmy => {
                    if (oldArmy.id === army.id) {
                        return army;
                    }
                    return oldArmy;
                }));
            });
        }
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
            updatePartyPosition(mapId, partyPosition.x, partyPosition.y, partyPosition.q, partyPosition.r).catch(console.log);
        }
    }, [partyPosition]);

    if (role === Role.Unauthenticated) {
        return <LoginRegister onLoadMap={handleLoadMap} />;
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <OverlayAccordion>
                <KingdomData mapId={mapId} hexData={hexData} level={level} gmView={role === Role.GM} armies={armies} setArmies={setArmies} />
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
                {!loading &&
                    <TokenOverlay armies={armies} partyPosition={partyPosition} hexMapData={hexData} gmView={role === Role.GM} />
                }
            </ConditionalWrapper>
        </ThemeProvider>
    );
};

export default App;
