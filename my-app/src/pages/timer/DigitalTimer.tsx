import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface IProps {
  onChangeTime?: (value: any, option: any) => void;
}

export const DigitalTimer: FC<IProps> = ({ onChangeTime }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f4f8",
          color: "#333",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
          width: "100%",
          maxWidth: "600px",
          margin: "20px auto",
        }}
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
        <DemoContainer
          components={[
            "MultiSectionDigitalClock",
          ]}
        >
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
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                fontSize: "1.5rem",
                color: "#333",
              }}
            />
          </DemoItem>
        </DemoContainer>
      </Box>
    </LocalizationProvider>
  );
};
