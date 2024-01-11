import React, {useEffect, useState} from "react";
import PartyToken from "./PartyToken";
import {Box} from "@mui/material";
import {rollDice} from "../../features/tables/DiceRoller";
import {randomEncounterDC, roadModifier} from "../../features/tables/RandomEncounter";
import {TerrainType} from "../../features/map/TerrainType";
import {TokenPosition} from "../../features/map/TokenPosition";
import {MapHexData} from "./MapHex";
import {Role} from "../login/Role";
import {updatePartyPosition} from "../../features/firestore/MapDataDao";

interface TokenOverlayProps {
    partyPosition: TokenPosition;
    hexMapData: Record<string, MapHexData>;
    gmView: boolean;
}

const TokenOverlay: React.FC<TokenOverlayProps> = ({partyPosition, hexMapData}) => {
    const [encounterText, setEncounterText] = useState<string>("");

    useEffect(() => {
        if (encounterText.length > 0) {
            const timeoutId = setTimeout(() => {
                setEncounterText("");
            }, 5000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [encounterText]);

    useEffect(() => {
        const encounterFlatCheck = rollDice(1, 20);
        const hexData = hexMapData[partyPosition.q + "," + partyPosition.r];
        const difficultyClass: number = randomEncounterDC[hexData?.terrainType as TerrainType] + (hexData?.roads ? roadModifier : 0);
        setEncounterText(`Rolled ${encounterFlatCheck}, DC is ${difficultyClass}. Encounter: ${(encounterFlatCheck >= difficultyClass ? "YES" : "NO")}`);
    }, [partyPosition]);

    return (
        <div className="draggable-icon" style={{
            left: partyPosition.x,
            top: partyPosition.y,
        }}>
            <PartyToken />
            <Box style={{ position: "absolute", backgroundColor: "black" }}>{encounterText}</Box>
        </div>
    );
};

export { TokenOverlay };
