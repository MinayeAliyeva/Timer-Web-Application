import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getCurrentTime, timeZones } from "../constants";
import { TTimeList } from "../modules";
import { useEffect } from "react";
import DefaultClock from "./DefaultClock";

export default function TimeList() {
  const [timeList, setTimeList] = React.useState<TTimeList[]>([]);

  const updateTimeList = () => {
    setTimeList((prevList) =>
      prevList.map((item: any) => ({
        ...item,
        time: getCurrentTime(item.value),
      }))
    );
  };

  const handleTimeZoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTimeZone = event?.target.value;
    console.log("selectedTimeZone", selectedTimeZone);
    const currentTime = getCurrentTime(selectedTimeZone);

    setTimeList((prevList) => [
      ...prevList,
      {
        city: event.target.options[event.target.selectedIndex].text,
        value: selectedTimeZone,
        time: currentTime,
      },
    ]);
  };

  useEffect(() => {
    const intervalId = setInterval(updateTimeList, 1000);
    return () => clearInterval(intervalId);
  }, []);
  console.log("29timeList", timeList);
  return (
    <>
      <select onChange={handleTimeZoneChange}>
        {timeZones?.map((timeZone) => {
          return <option key={timeZone?.city}>{timeZone?.value}</option>;
        })}
      </select>
      <DefaultClock />
      {timeList?.map((timeData) => {
        return (
          <List sx={{ width: "100%", bgcolor: "#000", color: "#fff" }}>
            <ListItem alignItems="flex-start" sx={{ paddingY: 2 }}>
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
            </ListItem>
          </List>
        );
      })}
    </>
  );
}
