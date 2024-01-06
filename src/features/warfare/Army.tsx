import {Condition} from "./conditions/Condition";
import {ArmyType} from "./ArmyType";
import {
    acByLevel,
    attackByLevel,
    highSaveByLevel,
    lowSaveByLevel,
    maxTactics,
    scoutingByLevel
} from "../tables/WarfareTable";
import {getDcByLevel} from "../tables/DcByLevel";
import {SpecializedArmyAdjustment} from "./SpecializedArmyAdjustment";
import {FirestoreDataConverter} from "firebase/firestore";
import {ConditionType, createCondition} from "./conditions/ConditionTypes";
import {tacticsMap} from "./TacticsDatabase";

class Army {
    id: string = "";
    mapId: string = "";
    name: string = "";
    level: number = 1;
    armyType: ArmyType;
    highManeuver: boolean;
    tactics: string[] = [];
    conditions: Condition[] = [];
    gear: [string, number][] = [];
    currentHp: number;
    _adjustment?: SpecializedArmyAdjustment;

    constructor(data: {
        id?: string, mapId?: string, name: string, armyType: ArmyType, highManeuver: boolean, level?: number,
        tactics?: string[], adjustment?: SpecializedArmyAdjustment, currentHp?: number, conditions?: Condition[],
        gear?: [string, number][]
    }) {
        this.id = data.id ?? "";
        this.mapId = data.mapId ?? "";
        this.name = data.name;
        this.armyType = data.armyType;
        this.highManeuver = data.highManeuver;
        this.level = data.level ?? 1;
        this.tactics = data.tactics ?? [];
        this._adjustment = data.adjustment;
        this.currentHp = data.currentHp ?? this.hp;
        this.conditions = data.conditions ?? [];
        this.gear = data.gear ?? [];
    }

    public get scouting(): number {
        return scoutingByLevel(this.level) + (this._adjustment?.scoutingAdjustment ?? 0);
    }

    public get consumption(): number {
        if (this.tactics.includes("Self Sufficient")) {
            return this.conditions.filter((condition) => condition.name === "Defeated").length === 0 ? -1 : 0;
        }

        if (this.tactics.includes("Live off the Land") || this.tactics.includes("Swamp Dwellers")) {
            return 0;
        }
        return this.armyType === ArmyType.Cavalry ? 2 : 1;
    }

    public get ac(): number {
        const skirmisherMod = this.armyType === ArmyType.Skirmisher && this._adjustment === undefined ? -2 : 0;
        const armor = this.gear.find(([gear,]) => gear === "Magical Armor");
        return acByLevel(this.level) + (armor ? armor[1] : 0) + (this._adjustment?.acAdjustment ?? 0) + skirmisherMod;
    }

    public get maneuver(): number {
        const skirmisherMod = this.armyType === ArmyType.Skirmisher && this._adjustment === undefined ? 2 : 0;
        if (this.highManeuver) {
            return highSaveByLevel(this.level) + (this._adjustment?.maneuverAdjustment ?? 0) + skirmisherMod;
        }

        return lowSaveByLevel(this.level) + (this._adjustment?.maneuverAdjustment ?? 0) + skirmisherMod;
    }

    public get morale(): number {
        const skirmisherMod = this.armyType === ArmyType.Skirmisher && this._adjustment === undefined ? 2 : 0;
        if (!this.highManeuver) {
            return highSaveByLevel(this.level) + (this._adjustment?.moraleAdjustment ?? 0) + skirmisherMod;
        }

        return lowSaveByLevel(this.level) + (this._adjustment?.moraleAdjustment ?? 0) + skirmisherMod;
    }

    public get hp(): number {
        return this.armyType === ArmyType.Siege ? 6 : 4 + (this._adjustment?.hpAdjustment ?? 0);
    }

    public get routThreshold(): number {
        if (this.tactics.includes("Brave")) {
            return 0;
        }

        return this.tactics.includes("Hold the Line") ? Math.ceil(this.hp / 4) : (Math.floor(this.hp / 2) + (this._adjustment?.routAdjustment ?? 0));
    }

    public get meleeAttack(): number {
        if (!this._adjustment && this.armyType === ArmyType.Siege && !this.gear.find(([gear,]) => gear === "Additional Weapon")) {
            return NaN;
        }
        const meleeWeapon = this.gear.find(([gear,]) => gear === "Magical Weapons (melee)");
        return attackByLevel(this.level) + (meleeWeapon ? meleeWeapon[1] : 0) + (this._adjustment?.meleeAdjustment ?? 0);
    }

    public get rangedAttack(): number {
        if (!this._adjustment && this.armyType !== ArmyType.Siege && !this.gear.find(([gear,]) => gear === "Additional Weapon")) {
            return NaN;
        }
        const rangedWeapon = this.gear.find(([gear,]) => gear === "Magical Weapons (ranged)");
        return attackByLevel(this.level) + (rangedWeapon ? rangedWeapon[1] : 0);
    }

    public get ammo(): number {
        return 5 + this.tactics.reduce((count, tactic) => { return count + (tactic === "Increased Ammunition" ? 2 : 0); }, 0);
    }

    public hasCondition(name: String): boolean {
        return this.conditions.find(condition => condition.name === name) !== undefined;
    }

    public addCondition(condition: Condition) {
        this.conditions.push(condition);
    }

    public removeCondition(condition: Condition) {
        this.conditions.splice(this.conditions.indexOf(condition), 1);
    }

    public countNonUniqueTactics(): number {
        return this.tactics.reduce((count, tactic) => count + (tacticsMap[tactic].unique ? 0 : 1), 0);
    }

    public get tacticsLimit(): number {
        return maxTactics(this.level);
    }
}

const armyConverter: FirestoreDataConverter<Army> = {
    toFirestore: (army: Army) => {
        return {
            mapId: army.mapId,
            name: army.name,
            armyType: army.armyType,
            highManeuver: army.highManeuver,
            currentHp: army.currentHp,
            conditions: Object.fromEntries(army.conditions.map(condition => { return [condition.name, condition.value ?? 0]; })),
            tactics: army.tactics,
            gear: army.gear.map(([gearName, gearValue]) => {
                return {
                    gear: gearName,
                    value: gearValue
                };
            })
        };
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Army({
            id: snapshot.id,
            mapId: data.mapId,
            name: data.name,
            armyType: data.armyType as ArmyType,
            highManeuver: data.highManeuver,
            currentHp: data.currentHp,
            conditions: Object.entries(data.conditions).map(([condition, value]) => { return createCondition(condition as ConditionType, value as number); }),
            tactics: data.tactics,
            gear: data.gear.map((gear: { gear: string; value: number; }) => [gear.gear, gear.value])
        });
    }
};

export { Army, armyConverter };
