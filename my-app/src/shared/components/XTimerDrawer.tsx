import { Box, Drawer } from "@mui/material";
import { DigitalTimer } from "../../pages/timer/DigitalTimer";
import { XButton } from "./XButton";

const XTimerDrawer = ({
  drawerOpen,
  toggleDrawer,
  onChangeTime,
  handleStart,
  setDrawerOpen
}: any) => {
  return (
    <Drawer
      anchor="bottom"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          borderRadius: "16px 16px 0 0",
          padding: 3, 
          backgroundColor: "#f7f7f7", 
          boxShadow: "0px -4px 16px rgba(0, 0, 0, 0.1)", 
        },
      }}
    >
      <Box
        sx={{
          width: "100%", 
          maxWidth: 400, 
          margin: "0 auto", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          gap: 2,
        }}
      >
        <DigitalTimer onChangeTime={onChangeTime} />
        <XButton setDrawerOpen={setDrawerOpen} handleStart={handleStart} />
      </Box>
    </Drawer>
  );
};

export default XTimerDrawer;
