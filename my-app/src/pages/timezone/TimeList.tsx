import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { TTimeList } from "../../modules";

import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { getCurrentTime } from "../../shared/components/constants";
import TimeDrawer from "../../shared/components/TimeDrawer";
import { useDispatch } from "react-redux";
import { setCity } from "../../store/features/timezoneSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Loading from "../../shared/components/Loading";

export default function TimeList() {
  const [timeList, setTimeList] = useState<TTimeList[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filteredTimeList, setFilteredTimeList] = useState<TTimeList[]>([]);

  const dispatch = useDispatch();
  const timeZones: string[] = useSelector<RootState>(
    (state) => state.timezones.cities
  ) as string[];
  console.log("cities", timeZones);

  const updateTimeList = useCallback(() => {
    const cityTimeZone: any = [];
    timeZones?.forEach((timeZone: string) => {
      const city = timeZone?.split("/")[1];
      const time = getCurrentTime(timeZone);

      cityTimeZone?.push({ city, time });
    });
    setTimeList(cityTimeZone);
  }, [timeZones]);

  const handleTimeZoneClick = (timeZone: string, cityName: string) => {
    console.log({ timeZone, cityName });
    dispatch(setCity(cityName));
    setDrawerOpen(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const intervalId = setInterval(updateTimeList, 1000);
    return () => clearInterval(intervalId);
  }, [timeZones]);

  const findCity = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue) {
      const newTimeList = timeList.filter((timeZone) =>
        timeZone.city.toLowerCase().includes(inputValue)
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
      {/* <DefaultClock /> */}
      {!timeList.length ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
}
