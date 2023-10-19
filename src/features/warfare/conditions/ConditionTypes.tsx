import {Condition} from "./Condition";
import {Outflanked} from "./Outflanked";
import {Efficient} from "./Efficient";
import {Concealed} from "./Concealed";
import {Defeated} from "./Defeated";
import {Distant} from "./Distant";
import {Engaged} from "./Engaged";
import {Fortified} from "./Fortified";
import {Lost} from "./Lost";
import {Mired} from "./Mired";
import {Pinned} from "./Pinned";
import {Routed} from "./Routed";
import {Shaken} from "./Shaken";
import {Weary} from "./Weary";

enum ConditionType {
    Concealed = "Concealed",
    Defeated = "Defeated",
    Distant = "Distant",
    Efficient = "Efficient",
    Engaged = "Engaged",
    Fortified = "Fortified",
    Lost = "Lost",
    Mired = "Mired",
    Outflanked = "Outflanked",
    Pinned = "Pinned",
    Routed = "Routed",
    Shaken = "Shaken",
    Weary = "Weary"
}

const createCondition = (condition: ConditionType): Condition => {
    switch (condition){
        case ConditionType.Concealed:
            return new Concealed();
        case ConditionType.Defeated:
            return new Defeated();
        case ConditionType.Distant:
            return new Distant();
        case ConditionType.Efficient:
            return new Efficient();
        case ConditionType.Engaged:
            return new Engaged();
        case ConditionType.Fortified:
            return new Fortified();
        case ConditionType.Lost:
            return new Lost();
        case ConditionType.Mired:
            return new Mired();
        case ConditionType.Outflanked:
            return new Outflanked();
        case ConditionType.Pinned:
            return new Pinned();
        case ConditionType.Routed:
            return new Routed();
        case ConditionType.Shaken:
            return new Shaken();
        case ConditionType.Weary:
            return new Weary();
    }
};

export { ConditionType, createCondition };
