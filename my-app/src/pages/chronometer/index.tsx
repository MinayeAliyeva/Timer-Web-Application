import { useState, useEffect, useCallback, useRef, memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  resetTime,
  setTimeHistoryAction,
  startTime,
} from "../../store/features/clonometerSlice";
import { useSelector } from "react-redux";
import { getTimeHistorySelector, RootState } from "../../store";
import { XAccordion } from "../../shared/components/XAccardion";
import { formatTime } from "../../helpers";

const Chronometer = () => {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(1);
  const [round, setRound] = useState(1);

  const dispatch = useDispatch();
  let time = useSelector<RootState>(
    (state) => state.clonometer.timeList
  ) as any;
  let { min, sec, ms } = time ?? { min: 0, sec: 0, ms: 0 };

  const interval_id = useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    if (running) {
      interval_id.current = setInterval(() => {
        ms++;
        if (ms >= 100) {
          sec++;
          ms = 0;
        }
        if (sec >= 60) {
          min++;
          sec = 0;
        }
        dispatch(
          startTime({
            min,
            sec,
            ms,
          })
        );
      }, 10);
    } else {
      clearInterval(interval_id.current);
    }
  }, [running]);

  const timeHistory = useSelector(getTimeHistorySelector);

  const startTimer = useCallback(() => {
    setRunning((prevRunning) => !prevRunning);
  }, []);

  const resetTimer = useCallback(() => {
    setRunning(false);
    setStep(1);
    setRound((prevRound) => prevRound + 1);
    dispatch(resetTime());
  }, []);

  const addStep = useCallback(() => {
    const options:any = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const createdDate = new Date().toLocaleTimeString("tr-TR", options);

    setStep((prevStep) => prevStep + 1);
    dispatch(setTimeHistoryAction({ ...time, step, round, createdDate }));
  }, [time, step, round, dispatch]);


  const groupedData = timeHistory.reduce((result: any, item: any) => {
    if (!result[item.round]) {
      result[item.round] = [];
    }
    result[item.round].push(item);
    return result;
  }, {});

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
          {formatTime(time.min)}:{formatTime(time.sec)}.{formatTime(time.ms)}
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
      <XAccordion data={groupedData} />
    </>
  );
};

export default memo(Chronometer);
