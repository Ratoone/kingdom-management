import { Hexagon } from "react-hexgrid";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";
import { HexplorationState, hexplorationStateColor, hexplorationStateOpacity } from "../map/HexplorationState";
import { TerrainFeature, featureToIcon } from "../map/TerrainFeature";
import styled from "@emotion/styled";
import { TerrainType, terrainToIcon } from "../map/TerrainType";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";

interface MapHexData {
    level: number;
    safe: boolean;
    state: HexplorationState;
    feature: TerrainFeature;
    roads: boolean;
    terrainType: TerrainType;
    hidden: boolean;
    reference: string;
}

interface MapHexProps extends HexagonProps {
    hexData: MapHexData;
    debugging?: boolean;
}

const MapHexagon = ({ debugging = false, hexData, ...rest }: MapHexProps) => {
    const StyledHexagon = styled(Hexagon)`
        stroke: rgb(${(255 - hexData.level * 24) % 256}, ${(hexData.level * 24) % 256}, ${hexData.level * 12});
        stroke-width: 0.11%;
        fill-opacity: ${hexplorationStateOpacity[hexData.state]};
        fill: ${hexplorationStateColor[hexData.state]};
        &:hover {
            fill: #4499a9;
            fill-opacity: 0.6;
        }
    `;

    const displayData = (state: HexplorationState): boolean => {
        return state !== HexplorationState.Unexplored || debugging;
    }

    return (
        <StyledHexagon {...rest}>
            {displayData(hexData.state) && !hexData.safe && (
                <FontAwesomeIcon icon={faSkullCrossbones} className="hex-icon hex-danger" color="orangered" />
            )}

            {displayData(hexData.state) && hexData.feature !== TerrainFeature.None && (
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
