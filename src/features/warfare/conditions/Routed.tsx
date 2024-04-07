import { Condition } from "./Condition";

class Routed extends Condition {
    constructor() {
        super({
            name: "Routed",
            description: "The army retreats, whether due to magical compulsion or simply broken morale. On its turn, " +
                "a routed army must use the Retreat war action. While routed, the army takes a –2 circumstance penalty " +
                "to Morale checks. This condition ends automatically once a war encounter is resolved, but the routed " +
                "army increases its shaken value by 1 in this case. If all armies on one side of a battle are routed " +
                "simultaneously, the battle ends and the other army is victorious.",
            moraleBonus: -2,
            circumstance: true,
        });
    }
}

export { Routed };
