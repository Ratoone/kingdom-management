import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
    children: JSX.Element[] | JSX.Element
}

const OverlayAccordion: React.FC<Props> = ({ children }) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <Accordion sx={{ position: "fixed", zIndex: "999", maxWidth: checked ? 1000 : 50 }} disableGutters>
            <AccordionSummary onClick={handleChange}>
                {checked ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

export default OverlayAccordion;