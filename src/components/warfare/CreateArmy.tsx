import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import React from "react";
import templates from "../../assets/army_templates.json";

interface CreateArmyProps {
    level: number
}

const CreateArmy: React.FC<CreateArmyProps> = ({ level }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const openTemplatePicker = () => setOpen(true);
    const closeTemplatePicker = () => setOpen(false);

    return (
        <div>
            <Button onClick={openTemplatePicker}>New Army</Button>
            <Dialog
                open={open}
                onClose={closeTemplatePicker}
            >
                <DialogTitle>Create New Army</DialogTitle>
                <DialogContent>
                    <form onSubmit={() => { }}>
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                        // onChange={(e) => handleFormChange(e.target.value)}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Army Template</InputLabel>
                            <Select
                                name="armyTemplate"
                            // onChange={(e) => handleFormChange(e.target.name, e.target.value)}
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
