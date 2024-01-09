import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { Key, useEffect, useState } from "react";
import { MapStats } from "../../features/map/MapStats";
import { CommodityType } from "../../features/map/CommodityType";
import { MapHexData } from "../map/MapHex";
import { HexplorationState } from "../../features/map/HexplorationState";
import { TerrainFeature } from "../../features/map/TerrainFeature";
import TabPanel from "../utils/TabPanel";
import { getResourceDie } from "../../features/tables/SizeTable";
import { Warfare } from "../warfare/Warfare";

interface DataProps {
    mapId: string;
    hexData: Record<string, MapHexData>;
    level: number;
    gmView: boolean;
}

const KingdomData: React.FC<DataProps> = ({ mapId, level, hexData, gmView }) => {
    const [tabValue, setTabValue] = useState(0);

    const [mapStats, setMapStats] = useState<MapStats>({
        size: 0, commodityProduction: {
            [CommodityType.Food]: 0,
            [CommodityType.Lumber]: 0,
            [CommodityType.Luxuries]: 0,
            [CommodityType.Ore]: 0,
            [CommodityType.Stone]: 0
        }, commodityStorage: {
            [CommodityType.Food]: 0,
            [CommodityType.Lumber]: 0,
            [CommodityType.Luxuries]: 0,
            [CommodityType.Ore]: 0,
            [CommodityType.Stone]: 0
        }
    });
    const [settlements, setSettlements] = useState<String[]>([]);


    useEffect(() => {
        const claimedHex = Object.entries(hexData).map(hex => hex[1])
            .filter(hex => hex.state === HexplorationState.Claimed);

        const emptyArray: String[] = [];
        const settlements: String[] = claimedHex.reduce((cities, hex) => {
            if (hex.feature === TerrainFeature.Settlement) {
                cities.push(hex.playerRef ?? "");
            }
            return cities;
        }, emptyArray);

        const lumberProd = claimedHex.reduce((prod, hex) => {
            return prod + (hex.feature !== TerrainFeature.WorkSite ? 0 : 1);
        }, 0);

        setMapStats((prevStats) => ({ ...prevStats, size: claimedHex.length, commodityProduction: { ...prevStats.commodityProduction, [CommodityType.Lumber]: lumberProd } }));
        setSettlements(settlements);
    }, [hexData]);

    return (
        <Box>
            <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
                <Tab label="Stats" />
                <Tab label="Resources" />
                <Tab label="Warfare" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <Typography>Kingdom Level: {level}</Typography>
                <Typography>Kingdom Size: {mapStats.size}</Typography>
                <Typography>Settlements: </Typography>
                <ul>{settlements.map(city => <li key={city as Key}>{city}</li>)}</ul>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Typography>Base Resource Die: {level + 4}d{getResourceDie(mapStats.size)}</Typography>
                <Typography>Lumber Production: {mapStats.commodityProduction[CommodityType.Lumber]}</Typography>
                <Typography>Ore Production: {mapStats.commodityProduction[CommodityType.Ore]}</Typography>
                <Typography>Stone Production: {mapStats.commodityProduction[CommodityType.Stone]}</Typography>
            </TabPanel>
            <TabPanel index={tabValue} value={2}>
                <Warfare mapId={mapId} level={level} gmView={gmView} />
            </TabPanel>
        </Box>
    );
};

export default KingdomData;
