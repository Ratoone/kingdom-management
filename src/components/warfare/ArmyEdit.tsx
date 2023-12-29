import { Army } from "../../features/warfare/Army";
import React, { useState } from "react";
import { Button, Divider, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import { tacticsMap } from "../../features/warfare/TacticsDatabase";
import { Delete } from "@mui/icons-material";
import { AddArmyTactic } from "./AddArmyTactic";

interface ArmyEditProps {
    army: Army;
    updateArmy: (army: Army) => void;
}

const ArmyEdit: React.FC<ArmyEditProps> = ({ army, updateArmy }) => {
    const [addingTactic, setAddingTactic] = useState<boolean>(false);

    const removeTactic = (tactic: string): void => {
        const index = army.tactics.findIndex(armyTactic => armyTactic === tactic);
        army.tactics.splice(index, 1);

        updateArmy(army);
    };

    return (
        <div style={{ padding: "15px" }}>
            <Typography variant="h5" component="div">
                Army Properties
            </Typography>
            <Typography variant="body1">
                Type: {army.armyType}
            </Typography>
            <Typography variant="body1">
                Name: {army.name}
            </Typography>
            <Typography variant="body1">
                Level: {army.level}
            </Typography>
            <Typography variant="body1">
                Scouting: +{army.scouting}
            </Typography>
            <Typography variant="body1">
                Consumption: {army.consumption}
            </Typography>
            <Divider />
            <Typography variant="body1">
                AC: {army.ac}
            </Typography>
            <Typography variant="body1">
                Maneuver: +{army.maneuver}
            </Typography>
            <Typography variant="body1">
                Morale: +{army.morale}
            </Typography>
            <Typography variant="body1">
                Health: {army.currentHp}/{army.hp}
            </Typography>
            <Typography variant="body1">
                Melee: +{army.meleeAttack}
            </Typography>
            <Typography variant="body1">
                Ranged: +{army.rangedAttack}, {army.ammo}/{army.ammo} ammo
            </Typography>
            <Divider />
            <div>
                <Button onClick={() => setAddingTactic(true)} disabled={army.countNonUniqueTactics() >= army.tacticsLimit} >
                    New Tactic
                </Button>
                <Typography>
                    Tactics ({army.countNonUniqueTactics()} / {army.tacticsLimit}):
                </Typography>
                <List sx={{ listStyleType: "disc" }}>
                    {army.tactics.map(tactic =>
                        <ListItem sx={{ display: "list-item" }} secondaryAction={
                            <IconButton edge="end" onClick={() => removeTactic(tactic)}>
                                <Delete />
                            </IconButton>
                        }>
                            <Tooltip title={tacticsMap[tactic].text} placement="left">
                                <Typography>
                                    {tactic}
                                </Typography>
                            </Tooltip>
                        </ListItem>
                    )}
                </List>
            </div>
            {addingTactic && <AddArmyTactic army={army} updateArmy={updateArmy} onClose={() => setAddingTactic(false)} />}
        </div>
    );
};

export { ArmyEdit };
