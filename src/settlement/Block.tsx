import { structuresMap } from "./SettlementDatabase";

export class Block {
    built: [string, number[]][] = [];

    public attemptBuild(structure: string, lots: number[]): boolean {
        if (this.lotsBuilt() + lots.length > 4) {
            return false;
        }

        this.built.push([structure, lots]);
        return true;
    }

    public lotsBuilt() {
        return this.built.reduce((acc, building) => acc + building[1].length, 0);
    }

    public getResidentials() {
        return this.built.reduce((acc, [buildingName,]) => acc + (structuresMap.get(buildingName)?.residential ? 1 : 0), 0);
    }

    public containsStructure(name: string): boolean {
        return this.built.some(([buildingName,]) => buildingName === name);
    }
}