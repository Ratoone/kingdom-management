import { CommodityType } from "../map/CommodityType";
import { getBaseComodityStorage, getResourceDie } from "../tables/SizeTable";
import { KingdomSheet } from "../sheet/KingdomSheet";
import { rollDice } from "../tables/DiceRoller";
import { MapStats } from "../map/MapStats";

export class KingdomTurn {
    resourcePoints: number = 0;
    commodities: Map<CommodityType, number>;

    constructor(leftoverCommodities: Map<CommodityType, number>) {
        this.commodities = leftoverCommodities;
    }

    public adjustUnrest(kingdom: KingdomSheet): number {
        let extraUnrest = 0;
        // foreach city : if city.isOvercrowded extraUnrest+=1
        // foreach event: 
        extraUnrest += kingdom.atWar ? 1 : 0;
        kingdom.unrest += extraUnrest;

        return kingdom.unrest;
    }

    public collectResources(level: number, kingdom: MapStats, bonusDice: number, penaltyDice: number) {
        const kingdomSize = kingdom.size;
        const resourceDice = Math.max(level + 4 + bonusDice - penaltyDice, 0);
        const resourceDie = getResourceDie(kingdomSize);
        this.resourcePoints = rollDice(resourceDice, resourceDie);

        for (const key of Object.keys(CommodityType) as Array<keyof typeof CommodityType>) {
            const commodity = CommodityType[key];
            if (commodity === CommodityType.Food) {
                continue;
            }

            const production = kingdom.commodityProduction[commodity];
            const maxStorage = getBaseComodityStorage(kingdomSize) + (kingdom.commodityStorage[commodity] ?? 0);

            this.commodities.set(commodity, Math.min(maxStorage, this.commodities.get(commodity) || 0 + (production ?? 0)));
        }
    }
}