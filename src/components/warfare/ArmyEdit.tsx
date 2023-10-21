import { Army } from "../../features/warfare/Army";
import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";

interface ArmyEditProps {
    army: Army;
}

const ArmyEdit: React.FC<ArmyEditProps> = ({ army }) => {

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
        </div>
    );
};

export { ArmyEdit };
