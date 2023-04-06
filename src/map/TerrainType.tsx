import { IconDefinition, faFrog, faMound, faMountain, faSeedling, faTree, faWater } from "@fortawesome/free-solid-svg-icons"

enum TerrainType {
    Aquatic = "Aquatic",
    Forest = "Forest",
    Plains = "Plains",
    Mountains = "Mountains",
    Hills = "Hills",
    Swamp = "Swamp"
}

const terrainToIcon: { [key in keyof typeof TerrainType]: [IconDefinition, string] } = {
    Aquatic: [faWater, "skyblue"],
    Forest: [faTree, "darkgreen"],
    Plains: [faSeedling, "yellow"],
    Mountains: [faMountain, "gray"],
    Hills: [faMound, "saddlebrown"],
    Swamp: [faFrog, "yellowgreen"]
}

export { TerrainType, terrainToIcon }
