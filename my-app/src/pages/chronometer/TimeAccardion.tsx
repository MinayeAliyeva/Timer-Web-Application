import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

export default function TimeListAcardion({round}:any) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        Round:{round}
      </AccordionSummary>
      <AccordionDetails>step1</AccordionDetails>
      <AccordionActions>
        <Button>Cancel</Button>
      </AccordionActions>
    </Accordion>
  );
}
