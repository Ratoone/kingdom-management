import { useState } from "react";
import { Role } from "./login/Role";
import HexagonalGrid from "./map/HexagonalGrid";
import LoginRegister from "./login/LoginRegister";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import OverlayAccordion from "./utils/OverlayAccordion";
import KingdomData from "./kingdom/KingdomData";
import { MapHexData } from "./map/MapHex";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

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

    const handleLoadMap = (mapId: string, playerLogin: boolean) => {
        setRole(!playerLogin ? Role.GM : Role.Player);
        setMapId(mapId);
    };

    if (role === Role.Unauthenticated) {
        return <LoginRegister onLoadMap={handleLoadMap} />;
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <OverlayAccordion>
                <KingdomData hexData={hexData} />
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
                <HexagonalGrid role={role} mapId={mapId} hexData={hexData} setHexData={setHexData} />
            </ConditionalWrapper>
        </ThemeProvider>
    );
};

export default App;
