import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import LoadMapForm from "./LoadMapForm";

import "./LoginRegister.css";

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
  }

const LoginRegister: React.FC<MapProps> = ({ onLoadMap }) => {
    const [tabIndex, setTabIndex] = useState(0);
    
    return (
        <Box sx={{ width: "100%", paddingTop: "20px" }}>
            <Tabs 
                value={tabIndex} 
                onChange={(_, newValue) => setTabIndex(newValue)} 
                className="login-tabs"
                centered
            >
                <Tab label="Load Map" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
                <LoadMapForm onSubmit={onLoadMap} />
            </TabPanel>

        </Box>
    );

};

export default LoginRegister;
