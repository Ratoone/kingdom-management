import {Army} from "../../features/warfare/Army";
import React, { useState } from "react";
import { Condition } from "../../features/warfare/conditions/Condition";
import {Button, Card, CardContent, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import {Outflanked} from "../../features/warfare/conditions/Outflanked";

interface ArmyEditProps {
    army: Army;
}

const ArmyEdit: React.FC<ArmyEditProps> = ({army}) => {
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
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Army Properties
                </Typography>
                <Typography variant="body1">
                    Name: {army.name}
                </Typography>
                <Typography variant="body1">
                    Level: {army.level}
                </Typography>
                {/* Render other properties here using army.getter methods */}
                <List>
                    <ListItem>
                        <ListItemText primary="Tactics" />
                        <TextField
                            value={newTactic}
                            onChange={(e) => setNewTactic(e.target.value)}
                        />
                        <Button onClick={addTactic}>Add Tactic</Button>
                    </ListItem>
                    {army.tactics.map((tactic, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={tactic} />
                            <Button onClick={() => removeTactic(tactic)}>Remove</Button>
                        </ListItem>
                    ))}
                </List>
                <List>
                    <ListItem>
                        <ListItemText primary="Conditions" />
                        <TextField
                            value={newCondition}
                            onChange={(e) => setNewCondition(e.target.value)}
                        />
                        <Button onClick={addCondition}>Add Condition</Button>
                    </ListItem>
                    {army.conditions.map((condition, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={condition.name} />
                            <Button onClick={() => removeCondition(condition)}>Remove</Button>
                        </ListItem>
                    ))}
                </List>
                <List>
                    <ListItem>
                        <ListItemText primary="Gear" />
                        <TextField
                            value={newGear}
                            onChange={(e) => setNewGear(e.target.value)}
                        />
                        <Button onClick={addGear}>Add Gear</Button>
                    </ListItem>
                    {army.gear.map((gear, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={gear[0]} secondary={`Value: ${gear[1]}`} />
                            <Button onClick={() => removeGear(gear)}>Remove</Button>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export { ArmyEdit };
