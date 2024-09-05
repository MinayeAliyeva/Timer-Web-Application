import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TTimeList } from "../../modules";
import { getCurrentTime } from "../../shared/components/constants";
import TimeDrawer from "../../shared/components/XTimeZoneDrawer";
import { useDispatch } from "react-redux";
import {
  deleteAllTimes,
  deleteCity,
  setCity,
} from "../../store/features/timezoneSlice";
import { useSelector } from "react-redux";
import { getCitiesSelector, RootState } from "../../store";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Loading from "../../shared/components/Loading";
import { IconButton } from "@mui/material";
import { AiOutlineSortAscending } from "react-icons/ai";

export default function TimeList() {
  const [timeList, setTimeList] = useState<TTimeList[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filteredTimeList, setFilteredTimeList] = useState<TTimeList[]>([]);

  const dispatch = useDispatch();
  const timeZones: string[] = useSelector<RootState>(
    getCitiesSelector
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
  const deleteTimeZone = (city: string) => {
    dispatch(deleteCity(city));
  };
  const allDelete = () => {
    dispatch(deleteAllTimes());
  };
  const displayedTimeList =
    filteredTimeList.length > 0 ? filteredTimeList : timeList;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF9500",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "10px 20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "300px",
            margin: "0 5px",
          }}
          onClick={toggleDrawer(true)}
        >
          Zaman Dilimi Seç
        </Button>

        <TextField
          onChange={findCity}
          placeholder="Şehir Ara"
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "200px",
            input: {
              padding: "10px",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            backgroundColor: "#FF9500",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "5px 25px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            height: "30px",
            cursor: "pointer",
          }}
          onClick={() => allDelete()}
        >
          <Typography sx={{ color: "#fff" }}>ALL DELETE</Typography>
          <MdDelete style={{ color: "#fff" }} />
        </Box>
        <AiOutlineSortAscending style={{ color: "#fff", fontSize: "30px" }} />
      </Box>
      <TimeDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleTimeZoneClick={handleTimeZoneClick}
      />
      {!timeList.length ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loading />
        </Box>
      ) : (
        <List
          sx={{
            width: "100%",
            bgcolor: "#000",
            color: "#fff",
            paddingX: 2,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {displayedTimeList.length
            ? displayedTimeList.map((timeData) => (
                <Box
                  key={timeData.city}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingY: 2,
                    paddingX: 1,
                    backgroundColor: "#1c1c1c",
                    borderRadius: "12px",
                    mb: 2,
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
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
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                      {timeData.time}
                    </Typography>
                    <IconButton onClick={() => deleteTimeZone(timeData?.city)}>
                      <MdDelete style={{ fontSize: "25px", color: "#fff" }} />
                    </IconButton>
                  </Box>
                </Box>
              ))
            : "Dünya saati yok"}
        </List>
      )}
    </>
  );
}
