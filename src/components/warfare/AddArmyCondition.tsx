import React from "react";
import { Army } from "../../features/warfare/Army";
import { Button, Dialog, Stack } from "@mui/material";
import { ConditionType, createCondition } from "../../features/warfare/conditions/ConditionTypes";

interface AddArmyConditionProps {
    army: Army;
    updateArmy: (army: Army) => void;
    onClose: () => void;
}

const AddArmyCondition: React.FC<AddArmyConditionProps> = ({ army, updateArmy, onClose }) => {
    const addCondition = (condition: string) => {
        army.addCondition(createCondition(condition as ConditionType));
        updateArmy(army);
        onClose();
    };

    return <Dialog
        open={true}
        onClose={onClose}
    >
        <Stack>
            {(Object.keys(ConditionType)).map(
                (condition) => {
                    return <Button key={condition} value={condition} onClick={() => addCondition(condition)}>{condition}</Button>;
                }
            )}
        </Stack>
    </Dialog>;
};

export { AddArmyCondition };