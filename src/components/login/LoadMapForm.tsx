import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
} from "@mui/material";

import "./LoadMapForm.css";

interface LoginFormProps {
  onSubmit: (username: string, password?: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [mapId, setMapId] = useState("");
    const [password, setPassword] = useState("");
    const [playerLogin, setPlayerLogin] = useState(false);

    const handleLoad = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(mapId, !playerLogin ? password : undefined);
    };

    return (
        <div className="login-container">
            <Box component="form" onSubmit={handleLoad} className="login-form">
                <TextField
                    label="Game ID"
                    variant="outlined"
                    required
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

export default LoginForm;