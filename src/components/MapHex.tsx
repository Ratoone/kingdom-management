import { Hexagon, Text } from "react-hexgrid";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";
import { HexplorationState, hexplorationStateColor } from "../map/HexplorationState";
import { TerrainFeature } from "../map/TerrainFeature";
import styled from "@emotion/styled";

interface MapHexData {
    level: number;
    safe: boolean;
    state: HexplorationState;
    feature: TerrainFeature;
    roads: boolean;
}

interface MapHexProps extends HexagonProps {
    hexData: MapHexData;
}

const MapHexagon = ({ hexData, ...rest }: MapHexProps) => {
    const StyledHexagon = styled(Hexagon)`
        stroke: rgb(243, 0, 0);
        stroke-width: 0.1%;
        fill-opacity: 0.6;
        fill: ${hexplorationStateColor[hexData.state]};
        &:hover {
            fill: #4499a9;
        }
    `;

    return (
        <StyledHexagon {...rest}>
            {hexData.feature !== TerrainFeature.None ? (<Text className="hex-text">{hexData.feature}</Text>) : undefined}
            {!hexData.safe ? (<Text className="hex-text">Danger!</Text>) : undefined}
        </StyledHexagon>
    );
};

export { MapHexagon };
export type { MapHexData };
