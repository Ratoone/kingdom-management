import { getBaseConsumption, getMaxBlocks } from "../tables/SettlementSize";
import { UrbanGrid } from "./UrbanGrid";

export class Settlement {
    name: string;
    size: number = 1;
    urbanGrids: UrbanGrid[] = [new UrbanGrid()];

    constructor(data: {
        name: string;
        size?: number;
        urbanGrids?: UrbanGrid[];
    }) {
        this.name = data.name;

        if (data.size) {
            this.size = data.size;
        }

        if (data.urbanGrids) {
            this.urbanGrids = data.urbanGrids;
        }
    }

    public isOverCrowded(): boolean {
        return this.urbanGrids.reduce((residences, grid) => residences + grid.getResidentials() - grid.getNonEmptyBlockCount(), 0) > 0;
    }

    public canAdvance(): boolean {
        if (this.size < 4 && getMaxBlocks(this.size) > this.urbanGrids[0].getNonEmptyBlockCount()) {
            return false;
        }

        if (this.size === 1) {
            return this.urbanGrids[0].getSmallestNonEmptyBlock().built.length === 4;
        }

        return this.urbanGrids.reduce((flag, grid) => flag && (grid.getSmallestNonEmptyBlock().built.length >= 2), true);
    }

    public getConsumption() {
        return getBaseConsumption(this.size) -
            (this.urbanGrids[0].sewers ? 1 : 0) -
            (this.containsStructure("Stockyard") ? 1 : 0) -
            (this.containsStructure("Mill") ? 1 : 0);
    }

    public containsStructure(name: string): boolean {
        return this.urbanGrids.some((grid) => grid.containsStructure(name));
    }
}