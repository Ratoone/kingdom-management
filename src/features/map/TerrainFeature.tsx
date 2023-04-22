import {
    IconDefinition,
    faBridgeWater,
    faBuildingCircleXmark,
    faDollarSign,
    faHouse,
    faIndustry,
    faLandmark,
    faPeopleRoof,
    faTowerObservation,
    faWheatAwn
} from "@fortawesome/free-solid-svg-icons";

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
    Bridge: [faBridgeWater, "gray"],
    Farmland: [faWheatAwn, "yellow"],
    Freehold: [faHouse, "grey"],
    Landmark: [faLandmark, "white"],
    Refuge: [faPeopleRoof, "green"],
    Resource: [faDollarSign, "goldenrod"],
    Ruins: [faBuildingCircleXmark, "darkslategray"],
    Settlement: [faHouse, "royalblue"],
    Structure: [faTowerObservation, "powderblue"],
    WorkSite: [faIndustry, "silver"]
};

export { TerrainFeature, featureToIcon };