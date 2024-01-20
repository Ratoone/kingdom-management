import React from "react";
import { Army } from "../../features/warfare/Army";
import { Button, Dialog, Paper, Stack, Tooltip } from "@mui/material";
import { tacticsMap } from "../../features/warfare/TacticsDatabase";

interface AddArmyTacticProps {
    army: Army;
    updateArmy: (army: Army) => void;
    onClose: () => void;
}

const AddArmyTactic: React.FC<AddArmyTacticProps> = ({ army, updateArmy, onClose }) => {
    const addTactic = (tactic: string) => {
        army.tactics.push(tactic);
        updateArmy(army);
        onClose();
    };

    return <Dialog
        open={true}
        onClose={onClose}
    >
        <Paper style={{ maxHeight: 400, overflow: "auto" }}>
            <Stack>
                {Object.keys(tacticsMap)
                    .filter(tactic => tacticsMap[tactic].level <= army.level)
                    .filter(tactic => !tacticsMap[tactic].unique)
                    .filter(tactic => !!tacticsMap[tactic].units.find(unitType => unitType === army.armyType))
                    .map(
                        (tactic) => {
                            return (
                                <Tooltip key={tactic} title={tacticsMap[tactic].text} placement="right">
                                    <Button
                                        value={tactic}
                                        onClick={() =>
                                            addTactic(tactic)}
                                        disabled={!!army.tactics.find(armyTactics => armyTactics === tactic && !tacticsMap[tactic].repeatable)}>
                                        <div style={{ display: "flex", width: "250px", justifyContent: "space-between" }}>
                                            <div>{tactic}</div>
                                            <div>{tacticsMap[tactic].level}</div>
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

export { AddArmyTactic };
