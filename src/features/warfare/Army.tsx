import { Condition } from "./conditions/Condition";
import { ArmyType } from "./ArmyType";
import { acByLevel, attackByLevel, highSaveByLevel, lowSaveByLevel, scoutingByLevel } from "../tables/WarfareTable";
import { getDcByLevel } from "../tables/DcByLevel";
import { SpecializedArmyAdjustment } from "./SpecializedArmyAdjustment";
import { FirestoreDataConverter } from "firebase/firestore";

class Army {
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
        name: string, armyType: ArmyType, highManeuver: boolean, level?: number, tactics?: string[],
        adjustment?: SpecializedArmyAdjustment, currentHp?: number, conditions?: Condition[]
    }) {
        this.name = data.name;
        this.armyType = data.armyType;
        this.highManeuver = data.highManeuver;
        this.level = data.level ?? 1;
        this.tactics = data.tactics ?? [];
        this._adjustment = data.adjustment;
        this.currentHp = data.currentHp ?? this.hp;
        this.conditions = data.conditions ?? [];
    }

    public get scouting(): number {
        return scoutingByLevel(this.level) + (this._adjustment?.scoutingAdjustment ?? 0);
    }

    public get recruitment(): number {
        return getDcByLevel(this.level) + (this._adjustment?.recruitmentAdjustment ?? 0);
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

        return this.tactics.includes("Hold the Line") ? Math.ceil(this.hp / 4) : Math.floor(this.hp / 2) + (this._adjustment?.routAdjustment ?? 0);
    }

    public get meleeAttack(): number {
        const meleeWeapon = this.gear.find(([gear,]) => gear === "Magical Weapons (melee)");
        return attackByLevel(this.level) + (meleeWeapon ? meleeWeapon[1] : 0) + (this._adjustment?.meleeAdjustment ?? 0);
    }

    public get rangedAttack(): number {
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
}

const armyConverter: FirestoreDataConverter<Army> = {
    toFirestore: (army: Army) => {
        return {
            name: army.name,
            armyType: army.armyType,
            highManeuver: army.highManeuver
        };
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Army({
            name: data.name,
            armyType: data.armyType as ArmyType,
            highManeuver: data.highManeuver
        });
    }
};

export { Army, armyConverter };
