import {Condition} from "./Condition";

class Pinned extends Condition {
    constructor() {
        super({
            name: "Pinned",
            description: "The army and cannot move freely. It has the outflanked condition and cannot use any maneuver " +
                "war actions. A pinned army cannot be deployed.",
            maneuverBonus: -999,
            deployBonus: -999
        });
    }
}

export {Pinned};
