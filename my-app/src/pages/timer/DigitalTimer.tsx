import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import { FC } from "react";
import { Box } from "@mui/material";

interface IProps {
  onChangeTime?: (value: any, option: any) => void;
}

export const DigitalTimer: FC<IProps> = ({ onChangeTime }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "10px 5px 5px #607d8b75",
       
        }}
      >
        <DemoContainer
          components={[
            "MultiSectionDigitalClock",
            "MultiSectionDigitalClock",
            "MultiSectionDigitalClock",
          ]}
        >
          <DemoItem sx={{ textAlign: "center" }} label={"Saat    //Dakika    //  Saniye"}>
            <MultiSectionDigitalClock
              onChange={onChangeTime}
              views={["hours", "minutes", "seconds"]}
              ampm={false}
            />
          </DemoItem>
        </DemoContainer>
      </Box>
    </LocalizationProvider>
  );
};
