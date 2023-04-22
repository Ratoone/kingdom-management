import { Ability } from "./Ability";
import { RuinType } from "./Ruin";

const abilityToRuinMap: [Ability, RuinType][] = [
    [Ability.Culture, RuinType.Corruption],
    [Ability.Economy, RuinType.Decay],
    [Ability.Loyalty, RuinType.Strife],
    [Ability.Stability, RuinType.Crime],
];

function getRuinFromAbility(ruinType: RuinType): Ability {
    const result = abilityToRuinMap.find(([, ruin]) => ruin === ruinType);
    if (!result) {
        throw new TypeError(`No ability found for ruin ${ruinType}`);
    }
    const [ability,] = result;
    return ability;
}

function getAbilityFromRuin(abilityType: Ability): RuinType {
    const result = abilityToRuinMap.find(([ability,]) => ability === abilityType);
    if (!result) {
        throw new TypeError(`No ruin found for ability ${abilityType}`);
    }
    const [, ruin] = result;
    return ruin;
}

export { getAbilityFromRuin, getRuinFromAbility };