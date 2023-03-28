import { RuinType } from "../sheet/ability/Ruin";
import { Proficiency } from "../sheet/skill/Proficiency";
import { Skill } from "../sheet/skill/Skill";

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
    activities: Array<Activity> = [];
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
        buildSkill: string;
        buildProficiency: string;
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
        this.cost = data.cost;
        this.buildSkill = data.buildSkill;
        this.buildProficiency = data.buildProficiency;
        this.upgradeFrom = data.upgradeFrom;
        this.itemBonus = data.itemBonus;
        this.activities = data.activities.split("\n");
    }
}