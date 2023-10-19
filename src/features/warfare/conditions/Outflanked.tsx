import {Condition} from "./Condition";

class Outflanked extends Condition {
    constructor() {
        super({
            name: "Outflanked",
            description: "The army has enemies coming at it from many directions and must split its forces to deal " +
                "with threats on every side. The army takes a –2 circumstance penalty to its AC.",
            acBonus: -2
        });
    }
}

export {Outflanked};
