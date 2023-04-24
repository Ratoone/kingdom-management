import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import LoadGameForm from "./LoadGameForm";

import "./LoginRegister.css";
import NewGameForm from "./NewGameForm";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tab-${index}`}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
};

interface GameProps {
    onLoadGame: (username: string, password?: string) => void;
    onNewGame: (password: string) => void;
  }

const LoginRegister: React.FC<GameProps> = ({ onLoadGame, onNewGame }) => {
    const [tabIndex, setTabIndex] = useState(1);
    
    return (
        <Box sx={{ width: "100%", paddingTop: "20px" }}>
            <Tabs 
                value={tabIndex} 
                onChange={(_, newValue) => setTabIndex(newValue)} 
                className="login-tabs"
                centered
            >
                <Tab label="New Map" />
                <Tab label="Load Map" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
                <NewGameForm onSubmit={onNewGame} />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <LoadGameForm onSubmit={onLoadGame} />
            </TabPanel>

        </Box>
    );

};

export default LoginRegister;