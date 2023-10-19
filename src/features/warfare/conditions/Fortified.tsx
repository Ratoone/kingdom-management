import {Condition} from "./Condition";

class Fortified extends Condition {
    constructor() {
        super({
            name: "Fortified",
            description: "The army is in a defensive position as the result of a Garrison Army activity. While fortified, " +
                "enemy armies cannot engage the army and the army cannot engage enemy armies. A fortified army gains a +4 item " +
                "bonus to its AC and to Morale checks made to rally. A fortified army that uses a maneuver war action " +
                "immediately loses its fortified condition.",
            acBonus: 4
        });
    }
}

export {Fortified};
