import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

export const XAccordion = ({ data }: any) => {
  console.log("data", Object.entries(data));
  const keyValue = Object.entries(data);

  return (
    <div>
      {keyValue.map((item: any, index: number) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{item[0]}</Typography>
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
    </div>
  );
};
