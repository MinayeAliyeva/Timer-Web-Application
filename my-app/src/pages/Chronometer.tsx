import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ITimeHistory } from "../modules";

const Chronometer = () => {
  const [time, setTime] = useState<ITimeHistory>({ hr: 0, min: 0, sec: 0 });
  const [timeHistory, setTimeHistory] = useState<ITimeHistory[]>([]);
  const [running, setRunning] = useState(false);

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

  const startTimer = () => setRunning(true);
  const stopTimer = () => {
    setRunning(false);
    setTimeHistory((prevHistory) => [...prevHistory, { ...time }]);
  };

  const resetTimer = () => {
    setRunning(false);
    setTime({ hr: 0, min: 0, sec: 0 });
  };

  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#FF9500" }}>
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
          }}
          variant="contained"
          onClick={startTimer}
        >
          Başla
        </Button>
        <Button
          sx={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            margin: "0 10px",
          }}
          variant="contained"
          onClick={stopTimer}
        >
          Durdur
        </Button>
        <Button
          sx={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            margin: "0 10px",
          }}
          variant="contained"
          onClick={resetTimer}
        >
          Sıfırla
        </Button>
      </Box>
    </Box>
  );
};

export default Chronometer;
