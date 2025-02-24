import { ArmyType } from "./ArmyType";

export interface Tactic {
    name: string,
    level: number,
    text: string,
    units: ArmyType[],
    repeatable?: boolean,
    unique?: boolean,
    unlocks?: string[]
}
