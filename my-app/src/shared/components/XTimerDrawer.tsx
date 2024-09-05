import { Box, Drawer } from "@mui/material";
import { DigitalTimer } from "../../pages/timer/DigitalTimer";
import { XButton } from "./XButton";

const XTimerDrawer = ({
  drawerOpen,
  toggleDrawer,
  onChangeTime,
  handleStart
}: any) => {
  return (
    <Drawer
      anchor="bottom"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          borderRadius: "16px 16px 0 0",
          padding: 2,
          backgroundColor: "#fff",
          boxShadow: "0px -4px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <DigitalTimer onChangeTime={onChangeTime} />
        <XButton handleStart={handleStart} />
      </Box>
    </Drawer>
  );
};

export default XTimerDrawer;
