import { Ability } from "./ability/Ability";
import { AbilityScore } from "./ability/AbilityScore";
import { RuinType, Ruin } from "./ability/Ruin";
import { getAbilityForSkill } from "./skill/AbilitySkill";
import { Proficiency } from "./skill/Proficiency";
import { Skill } from "./skill/Skill";

class KingdomSheet {
    name: string;
    level: number = 1;
    xp: number = 0;
    fame: number = 0;
    usesFame: boolean = true;

    abilityScore: Map<Ability, AbilityScore> = new Map<Ability, AbilityScore>();
    ruins: Map<RuinType, Ruin> = new Map<RuinType, Ruin>();

    // cities: Array<City> = new Array<City>();
    // feats: Array<Feat> = new Array<Feats>();

    proficiencies: Map<Skill, Proficiency>;

    constructor() {
        this.name = "";
        this.proficiencies = new Map<Skill, Proficiency>();
        this.abilityScore.set(Ability.Culture, new AbilityScore(0));
        this.abilityScore.set(Ability.Economy, new AbilityScore(0));
        this.abilityScore.set(Ability.Loyalty, new AbilityScore(0));
        this.abilityScore.set(Ability.Stability, new AbilityScore(0));

        this.ruins.set(RuinType.Corruption, new Ruin());
        this.ruins.set(RuinType.Crime, new Ruin());
        this.ruins.set(RuinType.Decay, new Ruin());
        this.ruins.set(RuinType.Strife, new Ruin());
    }

    public getBaseSkillModifier(skill: Skill): number {
        return this.proficiencies.get(skill) || Proficiency.Untrained + this.level + this.getAbilityScoreForSkill(skill).getMod();
    }

    private getAbilityScoreForSkill(skill: Skill) {
        let score = this.abilityScore.get(getAbilityForSkill(skill));
        if (!score) {
            throw new TypeError(`No ability score found for skill ${skill}`)
        }

        return score;
    }
}