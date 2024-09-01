import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { List } from "@mui/material";
import HistoryList from "./HistoryList";

import { useDispatch } from "react-redux";
import { resetTimeHistory, setTimeHistoryAction } from "../../store/features/clonometerSlice";
import { useSelector } from "react-redux";
import { getTimeHistorySelector } from "../../store";
import { TypeTime } from "./modules";

const Chronometer = () => {
  const [time, setTime] = useState<TypeTime>({ hr: 0, min: 0, sec: 0 });
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (running) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          let { hr, min, sec } = prevTime;
          sec += 1;
          if (sec === 60) {
            sec = 0;
            min += 1;
          }
          if (min === 60) {
            min = 0;
            hr += 1;
          }
          return { hr, min, sec };
        });
      }, 1000);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [running]);
  const timeHistory = useSelector(getTimeHistorySelector);
  const startTimer = useCallback(() => {
    setRunning((prevRunning) => !prevRunning);
  }, []);

  const resetTimer = useCallback(() => {
    setRunning(false);
    setTime({ hr: 0, min: 0, sec: 0 });
    // setTimeHistory([]);
    dispatch(resetTimeHistory())
    setStep(1);
  }, [dispatch]);

  const addStep = useCallback(() => {
    const createdDate = new Date().toLocaleTimeString();

    // setTimeHistory((prevHistory) => [
    //   ...prevHistory,
    //   { ...time, step, createdDate },
    // ]);
    dispatch(setTimeHistoryAction({ ...time, step, createdDate }));
    setStep((prevStep) => prevStep + 1);
  }, [time, step]);
  console.log("HISTORY", timeHistory);

  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#000",
          color: "#fff",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "20px", color: "#FF9500" }}
        >
          Kronometre
        </Typography>
        <Typography
          variant="h1"
          sx={{
            marginBottom: "20px",
            fontSize: "80px",
            color: "#fff",
          }}
        >
          {formatTime(time.hr)}:{formatTime(time.min)}:{formatTime(time.sec)}
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "space-around", gap: "10px" }}
        >
          <Button
            sx={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              margin: "0 10px",
              backgroundColor: "#4CAF50",
            }}
            variant="contained"
            onClick={startTimer}
          >
            {running ? "Pause" : "Start"}
          </Button>
          <Button
            sx={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              margin: "0 10px",
              backgroundColor: "#FFC107",
            }}
            variant="contained"
            onClick={running ? addStep : resetTimer}
            disabled={!running && timeHistory.length === 0}
          >
            {running ? "Step" : "Reset"}
          </Button>
        </Box>
      </Box>

      <List sx={{ width: "100%", bgcolor: "#000", padding: "0" }}>
        {timeHistory.map((time, index) => (
          <HistoryList
            key={index}
            timeHistory={timeHistory}
            time={time}
            formatTime={formatTime}
            index={index}
          />
        ))}
      </List>
    </>
  );
};

export default Chronometer;
