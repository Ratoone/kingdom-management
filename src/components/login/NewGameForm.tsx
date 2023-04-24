import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

import "./LoadGameForm.css";

interface NewGameFormProps {
  onSubmit: (password: string) => void;
}

const NewGameForm: React.FC<NewGameFormProps> = ({ onSubmit }) => {
    const [password, setPassword] = useState("");

    const handleLoad = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(password);
    };

    return (
        <div className="login-container">
            <Box component="form" onSubmit={handleLoad} className="login-form">
                <TextField
                    label="GM Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <Button type="submit" variant="contained" color="primary" className="login-submit">
                    New Map
                </Button>
            </Box>
        </div>
    );
};

export default NewGameForm;