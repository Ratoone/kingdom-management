import { Hexagon } from "react-hexgrid";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";
import { HexplorationState, hexplorationStateColor, hexplorationStateOpacity } from "../../features/map/HexplorationState";
import { TerrainFeature, featureToIcon } from "../../features/map/TerrainFeature";
import styled from "@emotion/styled";
import { TerrainType, terrainToIcon } from "../../features/map/TerrainType";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones, faUserSecret } from "@fortawesome/free-solid-svg-icons";

import { tileByRoadString } from "../../features/map/RoadConfiguration";

import "./MapHex.scss";
import { Role } from "../login/Role";
import React from "react";

interface MapHexData {
    level: number;
    safe: boolean;
    state: HexplorationState;
    feature: TerrainFeature;
    roads: string;
    terrainType: TerrainType;
    hidden: boolean;
    reference: string;
    playerRef?: string;
}

interface MapHexProps extends HexagonProps {
    hexData: MapHexData;
    debugging?: boolean;
    role: Role;
}

const MapHexagon = ({ debugging = false, hexData, role, ...rest }: MapHexProps) => {
    const iconSize = 25;
    const StyledHexagon = styled(Hexagon)`
        stroke: hsl(${180 + hexData.level * 18 * (hexData.level % 2 === 0 ? 1 : -1)}, ${60 + hexData.level * 2}%, 50%);
        fill-opacity: ${hexplorationStateOpacity[hexData.state]};
        fill: ${hexplorationStateColor[hexData.state]};
    `;

    const shouldDisplayDanger = (state: HexplorationState, terrain: TerrainType): boolean => {
        if (state === HexplorationState.Unexplored && !debugging) {
            return false;
        }

        return state !== HexplorationState.Travelled || terrain === TerrainType.Plains;
    };

    const shouldDisplayFeature = (state: HexplorationState, feature: TerrainFeature): boolean => {
        if (role === Role.GM) {
            return true;
        }

        if (state === HexplorationState.Unexplored || hexData.hidden) {
            return false;
        }

        if (state === HexplorationState.Travelled) {
            return [TerrainFeature.Landmark, TerrainFeature.Settlement].some(item => item === feature);
        }

        return true;

    };

    const renderRoads = () => {
        if (hexData.roads.length === 0) {
            return "";
        }

        const [roadTile, rotation] = tileByRoadString(hexData.roads);
        return (
            <image href={roadTile} className={`hex-roads hex-roads-${rotation}`} />
        );

    };

    return (
        <StyledHexagon {...rest}>
            <title>{`${hexData.state}, Area #${hexData.level}`}</title>
            {renderRoads()}

            <text textAnchor="middle" className="hex-text">
                {!!hexData.playerRef && (
                    <tspan>{hexData.playerRef}</tspan>
                )}

                {role === Role.GM && !!hexData.reference && (
                    <tspan x="0" dy="50">{hexData.reference}</tspan>
                )}
            </text>

            {hexData.hidden && role === Role.GM && (
                <FontAwesomeIcon
                    width={iconSize}
                    height={iconSize}
                    icon={faUserSecret}
                    transform={{ x: -iconSize, y: -iconSize }}
                    className="hex-icon"
                />
            )}

            {shouldDisplayDanger(hexData.state, hexData.terrainType) && !hexData.hidden && !hexData.safe && (
                <FontAwesomeIcon
                    width={iconSize}
                    height={iconSize}
                    icon={faSkullCrossbones}
                    transform={{ x: -iconSize, y: -iconSize }}
                    className="hex-icon hex-danger"
                    color="orangered" />
            )}

            {shouldDisplayFeature(hexData.state, hexData.feature) && hexData.feature !== TerrainFeature.None && (
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
