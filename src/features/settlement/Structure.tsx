import { CommodityType } from "../map/CommodityType";
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
    build: [Skill, Proficiency][];
    upgradeFrom: string;
    itemBonus: number = 0;
    activities: Array<string> = [];

    constructor(data: {
        name: string;
        level: number;
        description: string;
        effects: string;
        residential: string;
        edifice: string;
        famous: string;
        infamous: string;
        lots: number;
        cost: string;
        build: string;
        upgradeFrom: string;
        itemBonus: string;
        activities: string;
    }) {
        this.name = data.name;
        this.level = data.level;
        this.description = data.description;
        this.effects = data.effects;
        this.residential = data.residential === "TRUE";
        this.edifice = data.edifice === "TRUE";
        this.famous = data.famous === "TRUE";
        this.infamous = data.infamous === "TRUE";
        this.lots = data.lots;
        this.cost = new StructureCost(data.cost);

        const regex = /^(?<skill>[A-Za-z]+)(?: \((?<proficiency>trained|expert|master|legendary)\))? DC (?<dc>\d+)$/;
        this.build = [];
        data.build.split("\n").forEach((value) => {
            const match = value.match(regex);
            if (match) {
                const { skill, proficiency, } = match.groups as {
                    skill: keyof typeof Skill;
                    proficiency: keyof typeof Proficiency;
                    dc: string;
                };
                this.build.push([Skill[skill], Proficiency[proficiency] || Proficiency.Untrained]);
            } else {
                throw new TypeError(`Unparsable string for build: ${data.build}`)
            }
        });

        this.upgradeFrom = data.upgradeFrom;
        this.itemBonus = parseInt(data.itemBonus);
        this.activities = data.activities.split("\n");

    }

    public getRuin(): RuinType | undefined {
        if (this.name === "Thieves' Guild" || this.name === "Illicit Market") {
            return RuinType.Crime;
        }

        if (this.name === "Tenement") {
            return RuinType.Any;
        }
    }

    public alternativeCost(): CommodityType | undefined {
        if (this.name === "Bridge" || this.name === "Watchtower") {
            return CommodityType.Stone;
        }

        return undefined;
    }
}