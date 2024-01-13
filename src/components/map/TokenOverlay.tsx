import React, { useEffect, useState } from "react";
import DragableToken from "./DragableToken";
import { Box } from "@mui/material";
import { rollDice } from "../../features/tables/DiceRoller";
import { randomEncounterDC, roadModifier } from "../../features/tables/RandomEncounter";
import { TerrainType } from "../../features/map/TerrainType";
import { TokenPosition } from "../../features/map/TokenPosition";
import { MapHexData } from "./MapHex";
import { Army } from "../../features/warfare/Army";

interface TokenOverlayProps {
    partyPosition: TokenPosition;
    hexMapData: Record<string, MapHexData>;
    gmView: boolean;
    armies: Array<Army>;
}

const TokenOverlay: React.FC<TokenOverlayProps> = ({ partyPosition, hexMapData, armies }) => {
    const [encounterText, setEncounterText] = useState<string>("");

    const armyLocations = armies.reduce((locations: Record<string, Array<Army>>, army) => {
        const locationString: string = `${army.position.q} ${army.position.r}`;
        if (!locations[locationString]) {
            locations[locationString] = [];
        }

        locations[locationString].push(army);
        return locations;
    }, {});

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
        <>
            {Object.values(armyLocations).map(armyLocation => (
                <div key={armyLocation[0].id} className="draggable-icon" style={{
                    display: "grid",
                    maxWidth: "150px",
                    maxHeight: "75px",
                    gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(armyLocation.length))}, 1fr)`,
                    alignContent: "space-evenly",
                    left: armyLocation[0].position.x,
                    top: armyLocation[0].position.y
                }}>
                    {armyLocation.map(army => (
                        <div key={army.id} style={{
                            filter: "grayscale(100%)",
                        }}>
                            <DragableToken type="army" entityId={army.id} />
                        </div>
                    ))}
                </div>

            ))}
            <div className="draggable-icon" style={{
                left: partyPosition.x,
                top: partyPosition.y,
                width: "150px"
            }}>
                <DragableToken type="party" entityId="" />
                <Box style={{ position: "absolute", backgroundColor: "black" }}>{encounterText}</Box>
            </div>
        </>
    );
};

export { TokenOverlay };
