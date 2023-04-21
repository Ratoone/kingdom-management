import { Block } from "./Block";
import { Layout } from "./Layout";

export class UrbanGrid {
    streetlamp: boolean = false;
    pavedStreets: boolean = false;
    sewers: boolean = false;
    blocks: Array<Block> = [
        new Block(), new Block(), new Block(),
        new Block(), new Block(), new Block(),
        new Block(), new Block(), new Block()
    ];
    layout: Array<Layout> = [new Layout(), new Layout(), new Layout(), new Layout()];

    public getNonEmptyBlockCount(): number {
        return this.blocks.reduce((acc, block) => acc + (block.built.length > 0 ? 1 : 0), 0);
    }

    public getSmallestNonEmptyBlock(): Block {
        return this.blocks.reduce((min, block) => block.lotsBuilt() > 0 &&
            (min.lotsBuilt() === 0 || block.lotsBuilt() < min.lotsBuilt()) ? block : min, this.blocks[0]);
    }

    public getResidentials() {
        return this.blocks.reduce((acc, block) => acc + block.getResidentials(), 0);
    }

    public containsStructure(name: string): boolean {
        return this.blocks.some((block) => block.containsStructure(name));
    }
}