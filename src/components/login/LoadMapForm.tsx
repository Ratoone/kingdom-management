import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
} from "@mui/material";

import "./LoadMapForm.css";
import {getPassword} from "../../features/firestore/MapDataDao";

interface LoadMapProps {
  onSubmit: (mapId: string, playerLogin: boolean) => void
}

const LoadMapForm: React.FC<LoadMapProps> = ({ onSubmit }) => {
    const [mapId, setMapId] = useState("S7FVbPdByRIKQzggDFDb");
    const [password, setPassword] = useState("");
    const [playerLogin, setPlayerLogin] = useState(false);

    const handleLoad = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (playerLogin || await getPassword(mapId) === password) {
            onSubmit(mapId, playerLogin);
        }
    };

    return (
        <div className="login-container">
            <Box component="form" onSubmit={handleLoad} className="login-form">
                <TextField
                    label="Game ID"
                    variant="outlined"
                    required
                    disabled
                    value={mapId}
                    onChange={(e) => setMapId(e.target.value)}
                />
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
