import { Box, Drawer, List, ListItem, Typography } from "@mui/material";
import { timeZones } from "./constants";

const TimeDrawer = ({ drawerOpen, toggleDrawer, handleTimeZoneClick }: any) => {
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
        <List sx={{ padding: 0 }}>
          {timeZones?.map((timeZone) => (
            <ListItem
              key={timeZone?.value}
              onClick={() =>
                handleTimeZoneClick(timeZone?.value, timeZone?.value)
              }
              sx={{
                paddingY: 1,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                {timeZone?.value}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default TimeDrawer;
