import { useState } from "react";
import { HexplorationState } from "../../features/map/HexplorationState";
import { TerrainFeature } from "../../features/map/TerrainFeature";
import { MapHexData } from "./MapHex";
import { TerrainType } from "../../features/map/TerrainType";
import {
    Popover,
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    DialogActions,
    Stack,
    FormHelperText
} from "@mui/material";


interface EditHexDataDialogProps {
    style: { top: number, left: number };
    hexData: MapHexData;
    open: boolean;
    onSave: (newHexData: MapHexData) => void;
    onClose: () => void;
}

const EditHexDataDialog: React.FC<EditHexDataDialogProps> = ({ open, style, hexData, onSave, onClose }) => {
    const [formData, setFormData] = useState(hexData);

    const handleFormChange = (name: string, value: string | number | boolean) => {
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (valid()) {
            onSave(formData);
        }
    };

    const valid = (): boolean => {
        return !invalidFeature;
    };

    const possibleWorkSite = [TerrainType.Forest, TerrainType.Hills, TerrainType.Mountains];

    const invalidFeature = formData.feature === TerrainFeature.WorkSite && !possibleWorkSite.some(terrain => terrain === formData.terrainType);

    return (
        <Popover open={open} onClose={onClose}
            anchorReference="anchorPosition"
            anchorPosition={style}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}>
            <DialogTitle>Edit Hex Data</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSave}>
                    <Stack spacing={2}>
                        <FormControlLabel
                            name="safe"
                            control={<Checkbox onChange={(e) => handleFormChange(e.target.name, e.target.checked)} />}
                            label="Safe"
                            checked={formData.safe} />
                        <FormControl fullWidth>
                            <InputLabel id="state-label">State</InputLabel>
                            <Select
                                labelId="state-label"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={(e) => handleFormChange(e.target.name, e.target.value)}
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
                                onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                                error={invalidFeature}
                            >
                                {(Object.keys(TerrainFeature) as Array<keyof typeof TerrainFeature>)
                                    .filter(key => isNaN(Number(TerrainFeature[key])))
                                    .map((feature) => (
                                        <MenuItem key={feature} value={feature}>
                                            {feature}
                                        </MenuItem >
                                    ))}
                            </Select>
                            {invalidFeature && <FormHelperText>Can only build WorkSite on Forest, Hills or Mountain</FormHelperText>}
                        </FormControl>

                        <TextField
                            name="roads"
                            onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                            inputProps={{
                                pattern: "^(?=[0-5]{0,6}$)0?1?2?3?4?5?$",
                            }}
                            label="Roads"
                            value={formData.roads} />

                        <TextField
                            label="Level"
                            type="number"
                            inputProps={{ min: 0, max: 20 }}
                            name="level"
                            value={formData.level}
                            onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="type-label">Terrain Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                name="terrainType"
                                value={formData.terrainType}
                                onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                            >
                                {(Object.keys(TerrainType) as Array<keyof typeof TerrainType>)
                                    .filter(key => isNaN(Number(TerrainType[key])))
                                    .map((feature) => (
                                        <MenuItem key={feature} value={feature}>
                                            {feature}
                                        </MenuItem >
                                    ))}
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            name="hidden"
                            control={<Checkbox onChange={(e) => handleFormChange(e.target.name, e.target.checked)} />}
                            label="Hidden"
                            checked={formData.hidden} />

                        <TextField
                            label="Reference"
                            type="text"
                            name="reference"
                            value={formData.reference}
                            onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                        />

                        <TextField
                            label="Player Reference"
                            type="text"
                            name="playerRef"
                            value={formData.playerRef ?? ""}
                            onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                        />

                        <DialogActions sx={{ justifyContent: "center" }}>
                            <Button variant="outlined" type="submit">Save</Button>
                            <Button variant="outlined" onClick={onClose}>Cancel</Button>
                        </DialogActions>
                    </Stack>
                </form>
            </DialogContent>
        </Popover >
    );
};

export default EditHexDataDialog;
