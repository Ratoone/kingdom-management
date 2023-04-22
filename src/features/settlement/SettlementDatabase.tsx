import structuresData from "../../assets/structures.json";
import { Structure } from "./Structure";

const structuresMap = structuresData.reduce((map, data) => {
    map.set(data.name, new Structure(data));
    return map;
}, new Map<string, Structure>);

export { structuresMap };