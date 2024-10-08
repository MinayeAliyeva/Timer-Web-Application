import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { MdDelete } from "react-icons/md";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetRound } from "../../store/features/clonometerSlice";
import { memo } from "react";
import { XAccordionBoxStyle } from "../../constands/style";

export const XAccordion = memo(({ data }: any) => {
  const keyValue = Object.entries(data);
  const dispatch = useDispatch();

  const deleteRound = (roundNumber: number) => {
    dispatch(resetRound(roundNumber));
  };

  return (
    <Box
      sx={XAccordionBoxStyle}
    >
      {keyValue.map((item: any, index: number) => (
        <Accordion sx={{ margin: "10px", width: "600px" }} key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Round: {item[0]}</Typography>
              <IconButton onClick={() => deleteRound(Number(item[0]))}>
                <MdDelete style={{ fontSize: "25px", textAlign: "center" }} />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {item[1].map((obj: any, i: number) => (
              <div key={i} style={{ marginBottom: "1rem" }}>
                <Typography variant="h6">
                  Tur: {obj.step} - Süre: {obj.min}:{obj.sec}:{obj.ms}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Yaranma Tarihi: {obj.createdDate}
                </Typography>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
});
