import { Condition } from "./Condition";

class Concealed extends Condition {
    constructor() {
        super({
            name: "Concealed",
            description: "A concealed army is tougher to target, and gains a +2 circumstance bonus on its Maneuver checks. " +
                "Attacks against it take a –2 circumstance penalty. This condition lasts as long as the event granting the " +
                "concealment persists.",
            acBonus: 2,
            maneuverBonus: 2,
            circumstance: true,
        });
    }
}

export { Concealed };
