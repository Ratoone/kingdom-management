import { Hexagon, Text } from "react-hexgrid";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";
import { HexplorationState, hexplorationStateColor, hexplorationStateOpacity } from "../map/HexplorationState";
import { TerrainFeature, featureToIcon } from "../map/TerrainFeature";
import styled from "@emotion/styled";
import { TerrainType, terrainToIcon } from "../map/TerrainType";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";

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
        fill-opacity: ${hexplorationStateOpacity[hexData.state]};
        fill: ${hexplorationStateColor[hexData.state]};
        &:hover {
            fill: #4499a9;
            fill-opacity: 0.6;
        }
    `;

    return (
        <StyledHexagon {...rest}>
            {hexData.state !== HexplorationState.Unexplored && !hexData.safe && (
                <FontAwesomeIcon icon={faSkullCrossbones} className="hex-icon hex-danger" color="orangered" />
            )}

            {hexData.state !== HexplorationState.Unexplored && hexData.feature !== TerrainFeature.None && (
                <FontAwesomeIcon
                    icon={featureToIcon[hexData.feature][0]}
                    className="hex-icon hex-feature"
                    color={featureToIcon[hexData.feature][1]}
                />
            )}

            <FontAwesomeIcon
                icon={terrainToIcon[hexData.terrainType][0]}
                className="hex-icon hex-terrain"
                color={terrainToIcon[hexData.terrainType][1]}
            />

        </StyledHexagon>
    );
};

export { MapHexagon };
export type { MapHexData };
