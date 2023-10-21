import { Army } from "../../features/warfare/Army";
import React, { useState } from "react";
import { Condition } from "../../features/warfare/conditions/Condition";
import { Button, Card, CardContent, Divider, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { Outflanked } from "../../features/warfare/conditions/Outflanked";

interface ArmyEditProps {
    army: Army;
}

const ArmyEdit: React.FC<ArmyEditProps> = ({ army }) => {
    const [newTactic, setNewTactic] = useState<string>("");
    const [newCondition, setNewCondition] = useState<string>("");
    const [newGear, setNewGear] = useState<string>("");

    const addTactic = () => {
        if (newTactic) {
            army.tactics.push(newTactic);
            setNewTactic("");
        }
    };

    const removeTactic = (tactic: string) => {
        const index = army.tactics.indexOf(tactic);
        if (index !== -1) {
            army.tactics.splice(index, 1);
        }
    };

    const addCondition = () => {
        if (newCondition) {
            const condition: Condition = new Outflanked();
            army.conditions.push(condition);
            setNewCondition("");
        }
    };

    const removeCondition = (condition: Condition) => {
        const index = army.conditions.indexOf(condition);
        if (index !== -1) {
            army.conditions.splice(index, 1);
        }
    };

    const addGear = () => {
        if (newGear) {
            const gear: [string, number] = [newGear, 0]; // You can set the number as needed
            army.gear.push(gear);
            setNewGear("");
        }
    };

    const removeGear = (gear: [string, number]) => {
        const index = army.gear.indexOf(gear);
        if (index !== -1) {
            army.gear.splice(index, 1);
        }
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
                Maneuver: {army.maneuver}
            </Typography>
            <Typography variant="body1">
                Morale: {army.morale}
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
