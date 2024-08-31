import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ITimeHistory } from "../modules";
import { List, ListItem, Divider } from "@mui/material";

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
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [running]);

  const startTimer = useCallback(() => setRunning(true), []);
  const stopTimer = useCallback(() => {
    setRunning(false);
    setStep((step) => step + 1);
    setTimeHistory((prevHistory) => [...prevHistory, { ...time, step: step }]);
  }, [setTimeHistory, setRunning, time, step]);

  const resetTimer = useCallback(() => {
    setRunning(false);
    setTime({ hr: 0, min: 0, sec: 0 });
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
            Başla
          </Button>
          <Button
            sx={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              margin: "0 10px",
              backgroundColor: "#F44336",
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
              backgroundColor: "#FFC107",
            }}
            variant="contained"
            onClick={resetTimer}
          >
            Sıfırla
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
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                Tur {time.step}
              </Typography>
              <Typography sx={{ fontSize: "18px" }}>
                {formatTime(time.hr)}:{formatTime(time.min)}:{formatTime(time.sec)}
              </Typography>
            </ListItem>
            {index < timeHistory.length - 1 && (
              <Divider sx={{ backgroundColor: "#555" }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default Chronometer;
