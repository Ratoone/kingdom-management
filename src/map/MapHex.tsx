import { HexplorationState } from "./HexplorationState";
import { TerrainFeature } from "./TerrainFeature";

export interface MapHex {
    cleared: boolean;
    state: HexplorationState;
    feature: TerrainFeature;
    roads: boolean;
}