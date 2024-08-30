import * as React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { getCurrentTime } from "../constants";
import { TTimeList } from "../modules";
import DefaultClock from "./DefaultClock";
import TimeDrawer from "./TimeDrawer";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

export default function TimeList() {
  const [timeList, setTimeList] = React.useState<TTimeList[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filteredTimeList, setFilteredTimeList] = React.useState<TTimeList[]>(
    []
  );

  const updateTimeList = () => {
    setTimeList((prevList) =>
      prevList.map((item) => ({
        ...item,
        time: getCurrentTime(item.city),
      }))
    );
  };

  const handleTimeZoneClick = (timeZone: string, cityName: string) => {
    const cityExists = timeList.some((timeZone) => timeZone.city === cityName);
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

  const findCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue) {
      const newTimeList = timeList.filter((timeZone) =>
        timeZone.city.split("/")[1]?.toLowerCase().includes(inputValue)
      );
      setFilteredTimeList(newTimeList);
    } else {
      setFilteredTimeList([]);
    }
  };

  const deleteCity = (cityName: string) => {
    setTimeList((prevList) =>
      prevList?.filter((item) => item.city !== cityName)
    );
  };

  const handleSwipeEnd = (cityName: string) => {
    deleteCity(cityName);
  };

  const displayedTimeList =
    filteredTimeList.length > 0 ? filteredTimeList : timeList;

  return (
    <>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Zaman Dilimi Seç
      </Button>
      <br />
      <br />
      <input onChange={findCity} placeholder="Şehir Ara" />
      <TimeDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleTimeZoneClick={handleTimeZoneClick}
      />
      <DefaultClock />
      <List sx={{ width: "100%", bgcolor: "#000", color: "#fff" }}>
        {displayedTimeList.length ? (
          <SwipeableList>
            {displayedTimeList.map((timeData) => (
              <SwipeableListItem
                key={timeData.city}
                leadingActions={
                  <SwipeAction
                    destructive
                    onClick={() => handleSwipeEnd(timeData.city)}
                  >
                    Sil
                  </SwipeAction>
                }
                onSwipeEnd={() => handleSwipeEnd(timeData.city)}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingY: 2,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "#FF9500",
                      }}
                    >
                      {timeData.city}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                      {timeData.time}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
              </SwipeableListItem>
            ))}
          </SwipeableList>
        ) : (
          "Dünya saati yok"
        )}
      </List>
    </>
  );
}
