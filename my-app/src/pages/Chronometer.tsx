import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { List, ListItem, Divider } from "@mui/material";

interface ITimeHistory {
  hr: number;
  min: number;
  sec: number;
  step?: number; // Optional step property
}

const Chronometer = () => {
  const [time, setTime] = useState<ITimeHistory>({ hr: 0, min: 0, sec: 0 });
  const [timeHistory, setTimeHistory] = useState<ITimeHistory[]>([]);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(1);

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
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [running]);

  const handleStartStop = useCallback(() => {
    if (running) {
      setRunning(false);
      setStep((step) => step + 1);
      setTimeHistory((prevHistory) => [
        ...prevHistory,
        { ...time, step: step },
      ]);
    } else {
      setRunning(true);
    }
  }, [running, setTimeHistory, time, step]);

  const resetTimer = useCallback(() => {
    setRunning(false);
    setTime({ hr: 0, min: 0, sec: 0 });
    setTimeHistory([]);
    setStep(1);
  }, []);

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
        <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Button
            sx={{
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              backgroundColor: running ? "#FF3B30" : "#4CD964",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: running
                ? "0px 4px 6px rgba(255, 59, 48, 0.5)"
                : "0px 4px 6px rgba(76, 217, 100, 0.5)",
              "&:hover": {
                backgroundColor: running ? "#FF3B30" : "#4CD964",
                boxShadow: running
                  ? "0px 6px 8px rgba(255, 59, 48, 0.7)"
                  : "0px 6px 8px rgba(76, 217, 100, 0.7)",
              },
            }}
            variant="contained"
            onClick={handleStartStop}
          >
            {running ? "Pause" : "Start"}
          </Button>
          <Button
            sx={{
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              backgroundColor: "#FFCC00",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0px 4px 6px rgba(255, 204, 0, 0.5)",
              "&:hover": {
                backgroundColor: "#FFCC00",
                boxShadow: "0px 6px 8px rgba(255, 204, 0, 0.7)",
              },
            }}
            variant="contained"
            onClick={resetTimer}
          >
            Reset
          </Button>
        </Box>
      </Box>

      <List sx={{ width: "100%", bgcolor: "#000", padding: "0" }}>
        {timeHistory.map((time, index) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 20px",
                color: "#fff",
                borderBottom: "1px solid #333",
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                Lap {time.step}
              </Typography>
              <Typography sx={{ fontSize: "18px" }}>
                {formatTime(time.hr)}:{formatTime(time.min)}:
                {formatTime(time.sec)}
              </Typography>
            </ListItem>
            {index < timeHistory.length - 1 && (
              <Divider sx={{ backgroundColor: "#333" }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default Chronometer;
