import { useEffect, useState } from "react";
import token from "../../assets/images/party_token.png";
import { TerrainType } from "../../features/map/TerrainType";
import { rollDice } from "../../features/tables/DiceRoller";
import { randomEncounterDC, roadModifier } from "../../features/tables/RandomEncounter";
import { MapHexData } from "./MapHex";
import "./PartyToken.css";
import { Box } from "@mui/material";

interface PartyTokenProps {
    x: number;
    y: number;
    hexData?: MapHexData
}

const PartyToken: React.FC<PartyTokenProps> = ({ x, y, hexData }) => {
    const [encounterText, setEncounterText] = useState<String>("");

    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        event.dataTransfer.setData("hexagon", "{}");
    };

    function handleDragEnd(_event: React.DragEvent<HTMLDivElement>): void {
        const encounterFlatCheck = rollDice(1, 20);
        const difficultyClass: number = randomEncounterDC[hexData?.terrainType as TerrainType] + (hexData?.roads ? roadModifier : 0);
        setEncounterText(`Rolled ${encounterFlatCheck}, DC is ${difficultyClass}. Encounter: ${(encounterFlatCheck >= difficultyClass ? "YES" : "NO")}`);
    }

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

    return (
        <div
            id="party-token"
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
                left: x,
                top: y,
            }}>
            <img src={token} style={{
                width: "50%"
            }} />
            <Box style={{ position: "absolute", backgroundColor: "black" }}>{encounterText}</Box>
        </div>
    );
};

export default PartyToken;