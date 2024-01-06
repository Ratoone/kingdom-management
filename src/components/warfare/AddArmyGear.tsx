import React from "react";
import { Army } from "../../features/warfare/Army";
import { Button, Dialog, Paper, Stack, Tooltip } from "@mui/material";
import { tacticsMap } from "../../features/warfare/TacticsDatabase";
import {gearMap} from "../../features/warfare/Gear";

interface AddArmyGearProps {
    army: Army;
    updateArmy: (army: Army) => void;
    onClose: () => void;
}

const AddArmyGear: React.FC<AddArmyGearProps> = ({ army, updateArmy, onClose }) => {
    const addGear = (gear: string) => {
        const index = army.gear.findIndex(([gearName,]) => gearName === gear);
        if (index === -1) {
            army.gear.push([gear, 1]);
        } else {
            army.gear[index][1] += 1;
        }
        updateArmy(army);
        onClose();
    };

    const findGearLevel = (gear: string) : number => {
        const index = army.gear.findIndex(([gearName,]) => gearName === gear);
        if (index === -1) {
            return 0;
        }
        return army.gear[index][1];
    };

    return <Dialog
        open={true}
        onClose={onClose}
    >
        <Paper style={{ maxHeight: 400, overflow: "auto" }}>
            <Stack>
                {Object.keys(gearMap)
                    .filter(gear => gearMap[gear].level[findGearLevel(gear)] <= army.level)
                    .map(
                        (gear) => {
                            return (
                                <Tooltip key={gear} title={gearMap[gear].text} placement="right">
                                    <Button
                                        value={gear}
                                        onClick={() => addGear(gear)}>
                                        <div style={{ display: "flex", width: "250px", justifyContent: "space-between" }}>
                                            <div>{gear}</div>
                                            <div>{gearMap[gear].cost}RP</div>
                                            <div>{gearMap[gear].level[findGearLevel(gear)]}</div>
                                        </div>
                                    </Button>
                                </Tooltip>
                            );
                        }
                    )}
            </Stack>
        </Paper>
    </Dialog>;
};

export { AddArmyGear };
