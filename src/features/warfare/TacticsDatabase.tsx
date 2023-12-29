import tacticsData from "../../assets/tactics.json";
import { Tactic } from "./Tactic";

const tacticsMap: Record<string, Tactic> = tacticsData.reduce((map, data) => {
    map = {
        ...map,
        [data.name]: data as Tactic
    };
    return map;
}, {});

export { tacticsMap };
