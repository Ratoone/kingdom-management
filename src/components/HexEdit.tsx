import { useState } from "react";
import { HexplorationState } from "../map/HexplorationState";
import { TerrainFeature } from "../map/TerrainFeature";
import { MapHexData } from "./MapHex";
import {
    Popover,
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    FormGroup,
    SelectChangeEvent,
    MenuItem,
    FormControlLabel,
    Checkbox,
    DialogActions,
    Stack
} from '@mui/material';


interface EditHexDataDialogProps {
    style: { top: number, left: number };
    hexData: MapHexData;
    key: string;
    open: boolean;
    onSave: (newHexData: MapHexData) => void;
    onClose: () => void;
}

const EditHexDataDialog: React.FC<EditHexDataDialogProps> = ({ open, style, hexData, onSave, onClose }) => {
    const [formData, setFormData] = useState(hexData);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleSelectChange = (event: SelectChangeEvent<HexplorationState | TerrainFeature>,) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: checked }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Popover open={open} onClose={onClose}
            anchorReference="anchorPosition"
            anchorPosition={style}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}>
            <DialogTitle>Edit Hex Data</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <FormControlLabel
                        name="cleared"
                        control={<Checkbox onChange={handleCheckboxChange} />}
                        label="Cleared"
                        checked={formData.cleared} />
                    <FormControl fullWidth>
                        <InputLabel id="state-label">State</InputLabel>
                        <Select
                            labelId="state-label"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleSelectChange}
                        >
                            {(Object.keys(HexplorationState) as Array<keyof typeof HexplorationState>)
                                .filter(key => isNaN(Number(HexplorationState[key])))
                                .map((state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem >
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="feature-label">Feature</InputLabel>
                        <Select
                            labelId="feature-label"
                            id="feature"
                            name="feature"
                            value={formData.feature}
                            onChange={handleSelectChange}
                        >
                            {(Object.keys(TerrainFeature) as Array<keyof typeof TerrainFeature>)
                                .filter(key => isNaN(Number(TerrainFeature[key])))
                                .map((feature) => (
                                    <MenuItem key={feature} value={feature}>
                                        {feature}
                                    </MenuItem >
                                ))}
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        name="roads"
                        control={<Checkbox onChange={handleCheckboxChange} />}
                        label="Roads"
                        checked={formData.roads} />
                    <TextField
                        label="Level"
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: 20 } }}
                        name="level"
                        value={formData.level}
                        onChange={handleFormChange}
                    />
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button variant="outlined" onClick={handleSave}>Save</Button>
                        <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    </DialogActions>
                </Stack>
            </DialogContent>
        </Popover >
    );
};

export default EditHexDataDialog