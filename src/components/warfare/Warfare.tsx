import {Drawer, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useState} from "react";
import {Army} from "../../features/warfare/Army";
import {ArmyType} from "../../features/warfare/ArmyType";
import {Outflanked} from "../../features/warfare/conditions/Outflanked";
import {ArmyEdit} from "./ArmyEdit";

const columns = [ "Name", "Health", "Conditions" ];

const Warfare: React.FC = () => {
    const [previewArmy, setPreviewArmy] = useState<number | undefined>(undefined);
    const [armies, setArmies] = useState<Army[]>([new Army({
        armyType: ArmyType.Infantry,
        currentHp: 0,
        highManeuver: false,
        name: "BOYZZZ",
        level: 1,
        conditions: [new Outflanked()]
    })]);

    return <div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {armies.map((army, index) => {
                            return (
                                <TableRow hover tabIndex={-1} key={index} onClick={_ => setPreviewArmy(index)}>
                                    <TableCell>{army.name}</TableCell>
                                    <TableCell>{army.currentHp}/{army.hp}</TableCell>
                                    <TableCell>{army.conditions.map(condition => condition.name)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        <Drawer anchor="right" open={previewArmy !== undefined} onClose={ _ => setPreviewArmy(undefined) }>
            <ArmyEdit army={armies[previewArmy ?? 0]} />
        </Drawer>
    </div>;
};

export {Warfare};
