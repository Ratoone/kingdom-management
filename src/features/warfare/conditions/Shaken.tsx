import { Condition } from "./Condition";

class Shaken extends Condition {
    constructor(value?: number) {
        super({
            name: "Shaken",
            description: "The army's morale has begun to falter, be it fear in the face of a powerful enemy, a " +
                "supernatural effect such as a dragon's frightful presence, or simply the result of ill fortune in the " +
                "tide of battle. Shaken always has a numerical value. The army's Morale checks take a circumstance " +
                "penalty equal to its shaken value, and whenever the army takes damage, it must succeed on a DC 11 flat " +
                "check or its shaken value increases by 1. An army that becomes shaken 4 is automatically routed. An army " +
                "reduces the value of this condition by 1 each Kingdom turn that passes during which it does not attempt " +
                "an Army activity or engage in a war encounter.",
            value: value ?? 1,
            circumstance: true,
        });
    }

    public get moraleBonus(): number {
        return - (this.value ?? 0);
    }
}

export { Shaken };
