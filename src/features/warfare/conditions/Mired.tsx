import { Condition } from "./Condition";

class Mired extends Condition {
    constructor(value?: number) {
        super({
            name: "Mired",
            description: "The army's movement is severely impaired. It may be bogged down in mud, snow, underbrush, rubble, " +
                "or similar terrain, encumbered by carrying heavy burdens, or any other reason. Mired always has a value. " +
                "A mired army takes a circumstance penalty on all maneuvers equal to its mired value and to Deploy Army " +
                "checks. If an army ever becomes mired 4, it becomes pinned.",
            value: value ?? 1,
            circumstance: true,
        });
    }

    public get maneuverBonus(): number {
        return - (this.value ?? 0);
    }

    public get deployBonus(): number {
        return - (this.value ?? 0);
    }
}

export { Mired };
