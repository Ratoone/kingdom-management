import { CommodityType } from "./CommodityType";

export class KingdomMap {
    public getSize(): number {
        return 1;
    }

    public getCommodityProduction(commodity: CommodityType) {
        return 0;
    }

    public getCommodityStorage(commodity: CommodityType) {
        return 0;
    }
}