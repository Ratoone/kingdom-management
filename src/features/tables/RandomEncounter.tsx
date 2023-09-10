import { TerrainType } from "../map/TerrainType";

const randomEncounterDC: { [key in keyof typeof TerrainType]: number } = {
    Aquatic: 17,
    Forest: 14,
    Plains: 12,
    Mountains: 16,
    Hills: 15,
    Swamp: 14
};

const roadModifier = -2;

export { randomEncounterDC, roadModifier };
