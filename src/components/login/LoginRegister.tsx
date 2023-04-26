import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import LoadMapForm from "./LoadMapForm";

import "./LoginRegister.css";
import NewMapForm from "./NewMapForm";

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

interface MapProps {
    onLoadMap: (mapId: string, playerLogin: boolean) => void;
    onNewMap: (password: string) => void;
  }

const LoginRegister: React.FC<MapProps> = ({ onLoadMap, onNewMap }) => {
    const [tabIndex, setTabIndex] = useState(1);

    const handleLoadMap = (mapId: string, password?: string) => {
        const requestBody = {
            mapId,
            passwordHash: password,
            playerLogin: !password
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        };
        fetch("http://localhost:3001/api/maps/load", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    onLoadMap(mapId, password === null);
                    return;
                }
                alert("Invalid mapId or password");
            })
            .catch(e => {
                alert("Something went wrong, try again later");
            });
    };
    
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
                <NewMapForm onSubmit={onNewMap} />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <LoadMapForm onSubmit={handleLoadMap} />
            </TabPanel>

        </Box>
    );

};

export default LoginRegister;