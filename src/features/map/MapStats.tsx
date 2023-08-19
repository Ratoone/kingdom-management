import { CommodityType } from "./CommodityType";

interface MapStats {
    size: number,
    commodityProduction: Record<CommodityType, number>,
    commodityStorage: Record<CommodityType, number>
}

export { type MapStats };