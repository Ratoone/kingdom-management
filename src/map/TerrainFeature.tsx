import { IconDefinition, faBridgeWater, faBuilding, faBuildingCircleXmark, faCity, faDollarSign, faHandHoldingDollar, faLandmark, faShield, faWheatAwn } from "@fortawesome/free-solid-svg-icons";

enum TerrainFeature {
    None = "None",
    Bridge = "Bridge",
    Farmland = "Farmland",
    Freehold = "Freehold",
    Landmark = "Landmark",
    Refuge = "Refuge",
    Resource = "Resource",
    Ruins = "Ruins",
    Settlement = "Settlement",
    Structure = "Structure",
    WorkSite = "WorkSite"
}

const featureToIcon: { [key in keyof Omit<typeof TerrainFeature, "None">]: [IconDefinition, string] } = {
    Bridge: [faBridgeWater, "yellow"],
    Farmland: [faWheatAwn, "yellow"],
    Freehold: [faCity, "grey"],
    Landmark: [faLandmark, "white"],
    Refuge: [faShield, "green"],
    Resource: [faDollarSign, "yellow"],
    Ruins: [faBuildingCircleXmark, "black"],
    Settlement: [faCity, "blue"],
    Structure: [faBuilding, "blue"],
    WorkSite: [faHandHoldingDollar, "yellow"]
}

export { TerrainFeature, featureToIcon }