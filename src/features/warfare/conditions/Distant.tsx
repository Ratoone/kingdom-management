import {Condition} from "./Condition";

class Distant extends Condition {
    constructor() {
        super({
            name: "Distant",
            description: "An army that has the distant condition has managed to retreat a fair range away from enemy " +
                "armies, and is potentially poised to make an escape from the field of battle. Armies can attempt " +
                "ranged Strikes against distant armies, but they take a –5 penalty on that Strike.",
            acBonus: 5
        });
    }
}

export {Distant};
