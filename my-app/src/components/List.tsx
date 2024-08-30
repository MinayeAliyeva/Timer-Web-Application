import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { getCurrentTime } from "../constants";
import { TTimeList } from "../modules";
import DefaultClock from "./DefaultClock";
import TimeDrawer from "./TimeDrawer";

export default function TimeList() {
  const [timeList, setTimeList] = React.useState<TTimeList[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const updateTimeList = () => {
    setTimeList((prevList) =>
      prevList.map((item) => ({
        ...item,
        time: getCurrentTime(item.city),
      }))
    );
  };

  const handleTimeZoneClick = (timeZone: string, cityName: string) => {
    const cityExists = timeList?.some(
      (timeZone) => timeZone?.city === cityName
    );
    if (!cityExists) {
      const currentTime = getCurrentTime(timeZone);
      setTimeList((prevList) => [
        ...prevList,
        {
          city: cityName,
          time: currentTime,
        },
      ]);
      setDrawerOpen(false);
    }
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  React.useEffect(() => {
    const intervalId = setInterval(updateTimeList, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Zaman Dilimi Seç
      </Button>
      <TimeDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleTimeZoneClick={handleTimeZoneClick}
      />
      <DefaultClock />
      <List sx={{ width: "100%", bgcolor: "#000", color: "#fff" }}>
        {timeList?.map((timeData) => (
          <ListItem
            alignItems="flex-start"
            key={timeData.city}
            sx={{ paddingY: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 18, color: "#FF9500" }}
                >
                  {timeData?.city}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                  {timeData?.time}
                </Typography>
              </Box>
            </Box>
            <Divider />
          </ListItem>
        ))}
      </List>
    </>
  );
}
