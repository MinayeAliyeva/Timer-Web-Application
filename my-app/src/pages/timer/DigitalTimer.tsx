import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import { FC, memo } from "react";
import { Box, Typography } from "@mui/material";
import { DigitalTimerBoxStyle, MultiSectionDigitalClockStyle } from "../../constands/style";

interface IProps {
  onChangeTime?: (value: any, option: any) => void;
}

export const DigitalTimer: FC<IProps> = memo(({ onChangeTime }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={DigitalTimerBoxStyle}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: 3,
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          Zamanlayıcı Ayarla
        </Typography>
        <DemoContainer components={["MultiSectionDigitalClock"]}>
          <DemoItem
            sx={{
              textAlign: "center",
              width: "100%",
            }}
            label="Saat // Dakika // Saniye"
          >
            <MultiSectionDigitalClock
              onChange={onChangeTime}
              views={["hours", "minutes", "seconds"]}
              ampm={false}
              sx={MultiSectionDigitalClockStyle}
              timeSteps={{ hours: 1, seconds: 1, minutes: 1 }}
            />
          </DemoItem>
        </DemoContainer>
      </Box>
    </LocalizationProvider>
  );
});
