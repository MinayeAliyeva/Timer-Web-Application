import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrevTimesSelector, getTimeSelector, RootState } from "../../store";
import XTimerDrawer from "../../shared/components/XTimerDrawer";
import AddButton from "./AddButton";
import { MdDelete } from "react-icons/md";
import { Box, Typography, Button } from "@mui/material";
import {
  setPrevTimes,
  setTime,
  deleteTime,
  setIsRunning,
} from "../../store/features/timerSlice";
import { ITime } from "../../modules";
import { DigitalBoxStyle, TimerBoxStyle, TypographyStyle } from "../../constands/style";



const Timer = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  let timeList = useSelector(getPrevTimesSelector);
  const time = useSelector(getTimeSelector);
  const isRunning = useSelector<RootState>((state) => state.timer.isRunning);


  let { h, m, s } = time;

  const initialTime = useRef(time);


  const [data, setData] = useState<any>();
  const onChangeTime = (newValue: any) => {
    const obj = {
      h: newValue?.$H || 0,
      m: newValue?.$m || 0,
      s: newValue?.$s || 0,
      currentTime: true,
      showHistory: false
    };

    setData({ ...obj });
    initialTime.current = obj;
  };

  const handleStartDrawer = () => {
    setDrawerOpen(true);
  };

  const handleStart = () => {
    dispatch(setTime(data));
    dispatch(setPrevTimes(data));
    dispatch(setIsRunning(!isRunning));
  };



  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const refreshTime = useCallback(
    (time: any) => {
      dispatch(setTime({ h: time.h, m: time.m, s: time.s }));
      dispatch(setIsRunning(true));
    },
    [dispatch]
  );

  const deleteTimer = (argTime: ITime) => {
    dispatch(deleteTime(argTime));
  };

  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <>
      <Box
        sx={DigitalBoxStyle}
      >
        <Typography
          sx={TypographyStyle}
        >
          {formatTime(h)}:{formatTime(m)}:{formatTime(s)}
        </Typography>
        <AddButton handleStart={handleStartDrawer} />
      </Box>

      <Typography sx={{ color: "white", marginTop: "20px" }}>
        Son Kullanılanlar
      </Typography>

      {timeList.map((time: any, index: number) => {
        console.log(" time.showHistory", time.showHistory);

        return (
          time.showHistory && (
            <Box
              key={index}
              sx={TimerBoxStyle}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {formatTime(time.h)}:{formatTime(time.m)}:{formatTime(time.s)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  sx={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#43a047",
                    },
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() => refreshTime(time)}
                >
                  Yenile
                </Button>
                <MdDelete
                  style={{
                    color: "#f44336",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteTimer(time)}
                />
              </Box>
            </Box>
          )
        );
      })}
      <XTimerDrawer
        setDrawerOpen={setDrawerOpen}
        handleStart={handleStart}
        onChangeTime={onChangeTime}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
};

export default Timer;
