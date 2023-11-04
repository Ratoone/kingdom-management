import {Condition} from "./Condition";

class Efficient extends Condition {
    constructor() {
        super({
            name: "Efficient",
            description: "The army has performed an Army activity with such speed that it can be used to attempt a second Army " +
                "activity immediately, but doing so causes it to lose the efficient condition. The second Army activity suffers " +
                "a –5 penalty on its check, and the result of this second Army activity check cannot grant the efficient " +
                "condition. If the army doesn't attempt a second Army activity, it instead loses the efficient condition and " +
                "reduces the value of one condition of its choice by 1.",
            deployBonus: -5
        });
    }
}

export {Efficient};
