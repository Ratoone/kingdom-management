import { Ability } from "../ability/Ability";
import { Skill } from "./Skill";

const skillMapping = new Map<Skill, Ability>([
    [Skill.Agriculture, Ability.Stability],
    [Skill.Arts, Ability.Culture],
    [Skill.Boating, Ability.Economy],
    [Skill.Defense, Ability.Stability],
    [Skill.Engineering, Ability.Stability],
    [Skill.Exploration, Ability.Economy],
    [Skill.Folklore, Ability.Culture],
    [Skill.Industry, Ability.Economy],
    [Skill.Intrigue, Ability.Loyalty],
    [Skill.Magic, Ability.Culture],
    [Skill.Politics, Ability.Loyalty],
    [Skill.Scholarship, Ability.Culture],
    [Skill.Statecraft, Ability.Loyalty],
    [Skill.Trade, Ability.Economy],
    [Skill.Warfare, Ability.Loyalty],
    [Skill.Wilderness, Ability.Stability]
]);

function getAbilityForSkill(skill: Skill): Ability {
    let ability = skillMapping.get(skill);
    if (!ability) {
        throw new TypeError(`No ability found for skill ${skill}`);
    }

    return ability;
}

export { skillMapping, getAbilityForSkill };