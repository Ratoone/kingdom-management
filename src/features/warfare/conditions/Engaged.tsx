import { Condition } from "./Condition";

class Engaged extends Condition {
    constructor() {
        super({
            name: "Engaged",
            description: "An army that is in close combat with one or more enemy armies becomes engaged. An army must be " +
                "engaged in order to attempt melee Strikes. If an army is engaged and attempts a maneuver war action that " +
                "would cause it to disengage, it provokes reactions from any enemy armies they were engaged with."
        });
    }
}

export { Engaged };
