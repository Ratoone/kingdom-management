import { Hexagon } from "react-hexgrid";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";
import { HexplorationState, hexplorationStateColor, hexplorationStateOpacity } from "../map/HexplorationState";
import { TerrainFeature, featureToIcon } from "../map/TerrainFeature";
import styled from "@emotion/styled";
import { TerrainType, terrainToIcon } from "../map/TerrainType";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";

import { tileByRoadString } from "./RoadConfiguration";

interface MapHexData {
    level: number;
    safe: boolean;
    state: HexplorationState;
    feature: TerrainFeature;
    roads: string;
    terrainType: TerrainType;
    hidden: boolean;
    reference: string;
}

interface MapHexProps extends HexagonProps {
    hexData: MapHexData;
    debugging?: boolean;
}

const MapHexagon = ({ debugging = false, hexData, ...rest }: MapHexProps) => {
    const iconSize = 25;
    const StyledHexagon = styled(Hexagon)`
        stroke: hsl(${180 + hexData.level * 9 * (hexData.level % 2 === 0 ? 1 : -1)}, 85%, 50%);
        stroke-width: 0.11%;
        fill-opacity: ${hexplorationStateOpacity[hexData.state]};
        fill: ${hexplorationStateColor[hexData.state]};
        &:hover {
            fill: #4499a9;
            fill-opacity: 0.6;
        }
    `;

    const shouldDisplayDanger = (state: HexplorationState, terrain: TerrainType): boolean => {
        if (state === HexplorationState.Unexplored && !debugging) {
            return false;
        }

        return state !== HexplorationState.Travelled || terrain === TerrainType.Plains;
    }

    const shouldDisplayFeature = (state: HexplorationState, feature: TerrainFeature): boolean => {
        if (state === HexplorationState.Unexplored && !debugging) {
            return false;
        }

        if (state === HexplorationState.Travelled) {
            return [TerrainFeature.Landmark, TerrainFeature.Settlement].some(item => item === feature);
        }

        return true;

    }

    const renderRoads = () => {
        if (hexData.roads.length === 0) {
            return "";
        }

        const [roadTile, rotation] = tileByRoadString(hexData.roads);
        return (
            <image href={roadTile} className={`hex-roads hex-roads-${rotation}`} />
        );

    }

    return (
        <StyledHexagon {...rest}>
            {renderRoads()}


            {shouldDisplayDanger(hexData.state, hexData.terrainType) && !hexData.hidden && !hexData.safe && (
                <FontAwesomeIcon
                    width={iconSize}
                    height={iconSize}
                    icon={faSkullCrossbones}
                    transform={{ x: -iconSize, y: -iconSize }}
                    className="hex-icon hex-danger"
                    color="orangered" />
            )}

            {shouldDisplayFeature(hexData.state, hexData.feature) && !hexData.hidden && hexData.feature !== TerrainFeature.None && (
                <FontAwesomeIcon
                    width={iconSize}
                    height={iconSize}
                    icon={featureToIcon[hexData.feature][0]}
                    transform={{ x: -iconSize }}
                    className="hex-icon hex-feature"
                    color={featureToIcon[hexData.feature][1]}
                />
            )}

            <FontAwesomeIcon
                width={iconSize}
                height={iconSize}
                icon={terrainToIcon[hexData.terrainType][0]}
                className="hex-icon hex-terrain"
                color={terrainToIcon[hexData.terrainType][1]}
            />

        </StyledHexagon >
    );
};

export { MapHexagon };
export type { MapHexData };
