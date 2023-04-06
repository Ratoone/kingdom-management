import { Hexagon, Text } from "react-hexgrid";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";
import { HexplorationState, hexplorationStateColor } from "../map/HexplorationState";
import { TerrainFeature } from "../map/TerrainFeature";
import styled from "@emotion/styled";
import { TerrainType } from "../map/TerrainType";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

interface MapHexData {
    level: number;
    safe: boolean;
    state: HexplorationState;
    feature: TerrainFeature;
    roads: boolean;
    terrainType: TerrainType;
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
            {hexData.state !== HexplorationState.Unexplored && !hexData.safe && (
                <FontAwesomeIcon icon={icon({ name: 'skull-crossbones' })} className="hex-icon" color="red" />
            )}

            {hexData.state !== HexplorationState.Unexplored && (
                <Text className="hex-text">
                    {hexData.feature !== TerrainFeature.None && (<tspan x="0" y="1.25mm">{hexData.feature}</tspan>)}
                </Text>
            )}

        </StyledHexagon>
    );
};

export { MapHexagon };
export type { MapHexData };
