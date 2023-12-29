import React from "react";
import { Army } from "../../features/warfare/Army";
import { Button, Dialog, Paper, Stack, Tooltip } from "@mui/material";
import { tacticsMap } from "../../features/warfare/TacticsDatabase";

interface AddArmyConditionProps {
    army: Army;
    updateArmy: (army: Army) => void;
    onClose: () => void;
}

const AddArmyTactic: React.FC<AddArmyConditionProps> = ({ army, updateArmy, onClose }) => {
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
                    .map(
                        (tactic) => {
                            return (
                                <Tooltip title={tacticsMap[tactic].text} placement="right">
                                    <Button
                                        key={tactic}
                                        value={tactic}
                                        onClick={() => addTactic(tactic)}
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