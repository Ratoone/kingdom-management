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
                {Object.keys(tacticsMap).map(
                    (tactic) => {
                        return (
                            <Tooltip title={tacticsMap[tactic].text} placement="right">
                                <Button
                                    key={tactic}
                                    value={tactic}
                                    onClick={() => addTactic(tactic)}
                                    disabled={!!army.tactics.find(armyTactics => armyTactics === tactic)}>
                                    {tactic}
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