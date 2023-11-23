import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import React from "react";
import templates from "../../assets/army_templates.json";
import { Army } from "../../features/warfare/Army";
import { ArmyType } from "../../features/warfare/ArmyType";

interface CreateArmyProps {
    level: number;
    saveArmy: (army: Army) => void;
}

const CreateArmy: React.FC<CreateArmyProps> = ({ level, saveArmy }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");
    const [template, setTemplate] = React.useState<string>("");

    const openTemplatePicker = () => setOpen(true);
    const closeTemplatePicker = () => setOpen(false);

    const createNewArmy = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const armyTemplate = templates.find(t => t.name === template);
        if (!armyTemplate) {
            return;
        }

        const army = new Army({
            name,
            level,
            armyType: (armyTemplate.armyType as ArmyType),
            highManeuver: armyTemplate.highManeuver
        });

        saveArmy(army);
        closeTemplatePicker();
    };

    return (
        <div>
            <Button onClick={openTemplatePicker}>New Army</Button>
            <Dialog
                open={open}
                onClose={closeTemplatePicker}
            >
                <DialogTitle>Create New Army</DialogTitle>
                <DialogContent>
                    <form onSubmit={createNewArmy}>
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Army Template</InputLabel>
                            <Select
                                name="armyTemplate"
                                required
                                onChange={(e) => setTemplate(e.target.value as string)}
                            >
                                {templates
                                    .filter(template => template.minLevel <= level)
                                    .map((template) => (
                                        <MenuItem key={template.name} value={template.name}>
                                            {template.name}
                                        </MenuItem >
                                    ))}
                            </Select>
                        </FormControl>

                        <DialogActions sx={{ justifyContent: "center" }}>
                            <Button variant="outlined" type="submit">Add</Button>
                            <Button variant="outlined" onClick={closeTemplatePicker}>Cancel</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export { CreateArmy };
