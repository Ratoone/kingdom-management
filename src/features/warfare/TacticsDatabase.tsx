import structuresData from "../../assets/tactics.json";
import { Tactic } from "./Tactic";

const tacticsMap = structuresData.reduce((map, data) => {
    map.set(data.name, data as Tactic);
    return map;
}, new Map<string, Tactic>);

export { tacticsMap };
