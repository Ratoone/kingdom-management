import { Condition } from "./Condition";

class Weary extends Condition {
    constructor(value?: number) {
        super({
            name: "Weary",
            description: "The army is exhausted. Weary always has a numerical value. A weary army takes a circumstance " +
                "penalty equal to its weary value to its AC, to its Maneuver checks, and to its Army activity checks; " +
                "it takes double this circumstance penalty on Deploy Army checks. An army reduces the value of this " +
                "condition by 1 each Kingdom turn that passes during which it does not attempt an Army activity or " +
                "engage in a war encounter.",
            value: value ?? 1
        });
    }

    public get acBonus(): number {
        return - (this.value ?? 0);
    }

    public get maneuverBonus(): number {
        return - (this.value ?? 0);
    }

    public get deployBonus(): number {
        return -2 * (this.value ?? 0);
    }
}

export { Weary };
