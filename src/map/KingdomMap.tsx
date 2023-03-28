import { CommodityType } from "./CommodityType";

export class KingdomMap {
    hexes: Array<Hex> = new Array<Hex>();

    public getSize(): number {
        return this.hexes.length;
    }

    public getCommodityProduction(commodity: CommodityType) {
        return 0;
    }

    public getCommodityStorage(commodity: CommodityType) {
        return 0;
    }
}