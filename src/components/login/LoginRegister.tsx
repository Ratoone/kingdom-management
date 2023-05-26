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
                <LoadMapForm onSubmit={onLoadMap} />
            </TabPanel>

        </Box>
    );

};

export default LoginRegister;
