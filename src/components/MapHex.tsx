import { Hexagon } from "react-hexgrid";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";
import { HexplorationState } from "../map/HexplorationState";
import { TerrainFeature } from "../map/TerrainFeature";

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
    return (
        <Hexagon fill="#fff" {...rest} />
    );
};

export { MapHexagon };
export type { MapHexData };
