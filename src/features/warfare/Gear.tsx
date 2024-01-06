import gearData from "../../assets/gear.json";

interface Gear {
    name: string;
    cost: number;
    level: Array<number>;
    text: string;
}

const gearMap: Record<string, Gear> = gearData.reduce((map, data) => {
    map = {
        ...map,
        [data.name]: data as Gear
    };
    return map;
}, {});

export {type Gear, gearMap};
