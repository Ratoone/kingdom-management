import { useState } from "react";
import { MapHexData } from "../map/MapHex"
import { HexplorationState } from "../map/HexplorationState";
import { TerrainFeature } from "../map/TerrainFeature";

interface EditHexDataDialogProps {
    style: Object;
    hexData: MapHexData;
    key: string;
    onSave: (newHexData: MapHexData) => void;
    onClose: () => void;
}

const EditHexDataDialog: React.FC<EditHexDataDialogProps> = ({ style, hexData, onSave, onClose }) => {
    const [formData, setFormData] = useState(hexData);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log(name + "  " + value);
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        console.log(name + "  " + checked);
        setFormData(prevFormData => ({ ...prevFormData, [name]: checked }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="dialog-overlay" style={style}>
            <h2>Edit Hex Data</h2>
            <form>
                <label>
                    Cleared:
                    <input
                        type="checkbox"
                        name="cleared"
                        checked={formData.cleared}
                        onChange={handleCheckboxChange}
                    />
                </label>
                <br />
                <label>
                    State:
                    <select name="state" value={formData.state} onChange={handleFormChange}>
                        {(Object.keys(HexplorationState) as Array<keyof typeof HexplorationState>)
                            .filter(key => !isNaN(Number(HexplorationState[key])))
                            .map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                    </select>
                </label>
                <br />
                <label>
                    Feature:
                    <select name="feature" value={formData.feature} onChange={handleFormChange}>
                        {(Object.keys(TerrainFeature) as Array<keyof typeof TerrainFeature>)
                            .filter(key => !isNaN(Number(TerrainFeature[key])))
                            .map((feature) => (
                                <option key={feature} value={feature}>
                                    {feature}
                                </option>
                            ))}
                    </select>
                </label>
                <br />
                <label>
                    Roads:
                    <input
                        type="checkbox"
                        name="roads"
                        checked={formData.roads}
                        onChange={handleCheckboxChange}
                    />
                </label>
                <br />
                <label>
                    Level:
                    <input
                        type="number"
                        min={1}
                        max={20}
                        name="level"
                        value={formData.level}
                        onChange={handleFormChange}
                    />
                </label>
            </form>
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default EditHexDataDialog