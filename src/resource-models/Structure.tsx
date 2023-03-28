import { RuinType } from "../sheet/ability/Ruin";
import { Proficiency } from "../sheet/skill/Proficiency";
import { Skill } from "../sheet/skill/Skill";
import { StructureCost } from "../turn/StructureCost";

export class Structure {
    name: string;
    level: number;
    description: string;
    effects: string;
    residential: boolean;
    edifice: boolean = false;
    famous: boolean = false;
    infamous: boolean = false;
    lots: number;
    cost: StructureCost;
    buildSkill: Skill;
    buildProficiency: Proficiency;
    upgradeFrom: string;
    itemBonus: number = 0;
    activities: Array<string> = [];
    ruin?: RuinType;

    constructor(data: {
        name: string;
        level: number;
        description: string;
        effects: string;
        residential: boolean;
        edifice: boolean;
        famous: boolean;
        infamous: boolean;
        lots: number;
        cost: string;
        build: string;
        upgradeFrom: string;
        itemBonus: number;
        activities: string;
    }) {
        this.name = data.name;
        this.level = data.level;
        this.description = data.description;
        this.effects = data.effects;
        this.residential = data.residential;
        this.edifice = data.edifice;
        this.famous = data.famous;
        this.infamous = data.infamous;
        this.lots = data.lots;
        this.cost = new StructureCost(data.cost);

        const regex = /^(?<skill>\w+)\s+\((?<proficiency>\w+)\)\s+DC\s+(?<dc>\d+)$/;
        const match = data.build.match(regex);
        if (match) {
            const { skill, proficiency, } = match.groups as {
                skill: keyof typeof Skill;
                proficiency: keyof typeof Proficiency;
                dc: string;
            };

            this.buildSkill = Skill[skill];
            this.buildProficiency = Proficiency[proficiency];
        } else {
            throw new TypeError(`Unparsable string for build: ${data.build}`)
        }

        this.upgradeFrom = data.upgradeFrom;
        this.itemBonus = data.itemBonus;
        this.activities = data.activities.split("\n");

        if (this.name === "Thieves' Guild" || this.name === "Illicit Market") {
            this.ruin = RuinType.Crime;
        } else if (this.name === "Tenement") {
            this.ruin = RuinType.Any;
        }
    }
}