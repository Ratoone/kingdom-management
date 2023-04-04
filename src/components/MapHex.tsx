import { Hexagon } from "react-hexgrid";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";
import { HexplorationState, hexplorationStateColor } from "../map/HexplorationState";
import { TerrainFeature } from "../map/TerrainFeature";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

interface MapHexData {
    level: number;
    cleared: boolean;
    state: HexplorationState;
    feature: TerrainFeature;
    roads: boolean;
}

interface MapHexProps extends HexagonProps {
    hexData: MapHexData;
}

const MapHexagon = ({ hexData, ...rest }: MapHexProps) => {
    const [fillColor, setFillColor] = useState<string>();
    useEffect(() => {
        const color = hexplorationStateColor[hexData.state];
        if (color) {
            setFillColor(color);
        }
    }, [hexData]);

    const StyledHexagon = styled(Hexagon)`
        stroke: rgb(243, 0, 0);
        stroke-width: 0.1%;
        fill-opacity: 0.6;
        fill: ${fillColor};
        &:hover {
            fill: #4499a9;
        }
    `;

    return (
        <StyledHexagon
            {...rest} />
    );
};

export { MapHexagon };
export type { MapHexData };
