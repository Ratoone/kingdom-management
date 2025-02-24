import { Army } from "../../features/warfare/Army";
import React, { useState } from "react";
import { Button, Checkbox, Divider, FormControlLabel, IconButton, List, ListItem, TextField, Tooltip, Typography } from "@mui/material";
import { tacticsMap } from "../../features/warfare/TacticsDatabase";
import { Delete } from "@mui/icons-material";
import { AddArmyTactic } from "./AddArmyTactic";
import { AddArmyGear } from "./AddArmyGear";
import { gearMap } from "../../features/warfare/Gear";
import { warActions } from "../../features/warfare/WarAction";

interface ArmyEditProps {
    army: Army;
    updateArmy: (army: Army) => void;
    gmView: boolean;
}

const ArmyEdit: React.FC<ArmyEditProps> = ({ army, updateArmy, gmView }) => {
    const [addingTactic, setAddingTactic] = useState<boolean>(false);
    const [addingGear, setAddingGear] = useState<boolean>(false);

    const removeTactic = (tactic: string): void => {
        const index = army.tactics.findIndex(armyTactic => armyTactic === tactic);
        army.tactics.splice(index, 1);

        updateArmy(army);
    };

    const removeGear = (gear: string): void => {
        const index = army.gear.findIndex(([gearName,]) => gearName === gear);
        if (army.gear[index][1] === 1) {
            army.gear.splice(index, 1);
        } else {
            army.gear[index][1] -= 1;
        }

        updateArmy(army);
    };

    const setAllegiance = (ally: boolean) => {
        army.ally = ally;

        updateArmy(army);
    };

    return (
        <div style={{ padding: "15px" }}>
            <Typography variant="h5" component="div">
                Army Properties
            </Typography>
            {gmView &&
                <FormControlLabel label={"Is ally?"} control={
                    <Checkbox checked={army.ally} onChange={(e) => setAllegiance(e.target.checked)} />
                } />
            }
            <Typography variant="body1">
                Type: {army.armyType}
            </Typography>
            <Typography variant="body1">
                Name: {army.name}
            </Typography>
            <Typography variant="body1">
                Level: {gmView ?
                    (<TextField value={army.level} size="small" type="number" onChange={(e) => { army.level = parseInt(e.target.value); updateArmy(army); }} />) :
                    army.level}
            </Typography>
            <Typography variant="body1">
                Scouting: +{army.scouting}
            </Typography>
            <Typography variant="body1">
                Consumption: {army.consumption}
            </Typography>
            <Divider />
            <Typography variant="body1">
                AC: {army.ac} + {army.modifierFromCondition("acBonus")}
            </Typography>
            <Typography variant="body1">
                Maneuver: +{army.maneuver} + {army.modifierFromCondition("maneuverBonus")}
            </Typography>
            <Typography variant="body1">
                Morale: +{army.morale} + {army.modifierFromCondition("moraleBonus")}
            </Typography>
            <Typography variant="body1">
                Health: {army.currentHp}/{army.hp}
            </Typography>

            {!isNaN(army.meleeAttack) &&
                <Typography variant="body1">
                    Melee: +{army.meleeAttack}
                </Typography>
            }

            {!isNaN(army.rangedAttack) &&
                <Typography variant="body1">
                    Ranged: +{army.rangedAttack}, {army.ammo}/{army.ammo} ammo
                </Typography>
            }
            <Divider />
            <div>
                {gmView &&
                    <Button onClick={() => setAddingTactic(true)} disabled={army.countNonUniqueTactics() >= army.tacticsLimit} >
                        New Tactic
                    </Button>
                }
                <Typography>
                    Tactics ({army.countNonUniqueTactics()} / {army.tacticsLimit}):
                </Typography>
                <List sx={{ listStyleType: "disc" }}>
                    {army.tactics.map(tactic =>
                        <ListItem key={tactic} sx={{ display: "list-item" }} secondaryAction={!tacticsMap[tactic].unique &&
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
            <Divider />
            <div>
                {gmView &&
                    <Button onClick={() => setAddingGear(true)}>
                        Add Gear
                    </Button>
                }
                <Typography>
                    Gear:
                </Typography>
                <List sx={{ listStyleType: "disc" }}>
                    {army.gear.map(([gearName, gearValue]) =>
                        <ListItem key={gearName} sx={{ display: "list-item" }} secondaryAction={
                            <IconButton edge="end" onClick={() => removeGear(gearName)}>
                                <Delete />
                            </IconButton>
                        }>
                            <Tooltip title={gearMap[gearName].text} placement="left">
                                <Typography>
                                    {gearName}: {gearValue}
                                </Typography>
                            </Tooltip>
                        </ListItem>
                    )}
                </List>
            </div>
            <Divider />
            <div>
                {warActions.map(action => (!action.requirement || !!army.tactics.find(tactic => tactic === action.requirement || !!tacticsMap[tactic]?.unlocks?.includes(action.name))) && (
                    <Tooltip title={<div dangerouslySetInnerHTML={{ __html: action.text }} />} key={action.name} placement="left">
                        <Typography>
                            {action.name} {action.cost.type === "action" ? "\u2B25".repeat(action.cost.value) : "\u293E"}
                            <i style={{ fontSize: "0.75rem" }}>{action.tags}</i>
                        </Typography>
                    </Tooltip>
                ))}
            </div>
            {addingTactic && <AddArmyTactic army={army} updateArmy={updateArmy} onClose={() => setAddingTactic(false)} />}
            {addingGear && <AddArmyGear army={army} updateArmy={updateArmy} onClose={() => setAddingGear(false)} />}
        </div>
    );
};

export { ArmyEdit };
