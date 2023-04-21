import { CommodityType } from "../map/CommodityType";

export class StructureCost {
    RP: number;
    commodityCost: Map<CommodityType, number> = new Map<CommodityType, number>;

    constructor(cost: string) {
        const regex = /^(?<rp>\d+)\s+RP(,\s+(?<commodity>\d+)\s+(?<type>\w+))*$/;
        const match = cost.match(regex);
        if (match) {
            const { rp, commodity = [], type = [] } = match.groups ?? {};

            this.RP = parseInt(rp);

            for (let i = 0; i < commodity.length; i++) {
                const amount = parseInt(commodity[i]);
                const commodityType = CommodityType[type[i] as keyof typeof CommodityType];
                this.commodityCost.set(commodityType, amount);
            }
        } else {
            throw new TypeError(`Cannot parse to structure cost: ${cost}`);
        }
    }
}