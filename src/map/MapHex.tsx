import { HexplorationState } from "./HexplorationState";
import { TerrainFeature } from "./TerrainFeature";

export interface MapHexData {
    level: number;
    cleared: boolean;
    state: HexplorationState;
    feature: TerrainFeature;
    roads: boolean;
}