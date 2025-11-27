import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

import "./LoadMapForm.css";
import {getAllCampaigns, getPassword} from "../../features/firestore/MapDataDao";
import { Campaign } from "../../features/campaign/Campaign";

interface LoadMapProps {
  onSubmit: (mapId: string, playerLogin: boolean) => void
}

const LoadMapForm: React.FC<LoadMapProps> = ({ onSubmit }) => {
    const [mapId, setMapId] = useState("S7FVbPdByRIKQzggDFDb");
    const [password, setPassword] = useState("");
    const [playerLogin, setPlayerLogin] = useState(false);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    useEffect(() => {
        getAllCampaigns().then(data => setCampaigns(data));
    });

    const handleLoad = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (playerLogin || await getPassword(mapId) === password) {
            onSubmit(mapId, playerLogin);
        }
    };

    return (
        <div className="login-container">
            <Box component="form" onSubmit={handleLoad} className="login-form">
                <InputLabel>Campaign Name</InputLabel>
                <Select
                    variant="outlined"
                    required
                    value={mapId}
                    onChange={(e) => setMapId(e.target.value)}
                >
                    {campaigns.map(campaign => (
                        <MenuItem value={campaign.id}>{campaign.name}</MenuItem>
                    ))}
                </Select>
                <br />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={playerLogin}
                            onChange={(e) => setPlayerLogin(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Player Login?"
                />
                <br />
                <TextField
                    label="GM Password"
                    variant="outlined"
                    type="password"
                    disabled={playerLogin}
                    value={password}
                    required={!playerLogin}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <Button type="submit" variant="contained" color="primary" className="login-submit">
                    Load Map
                </Button>
            </Box>
        </div>
    );
};

export default LoadMapForm;
