import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrevTimesSelector, getTimeSelector } from "../../store";
import AlertModal from "./DigitalModal";
import XTimerDrawer from "../../shared/components/XTimerDrawer";
import AddButton from "./AddButton";
import { MdDelete } from "react-icons/md";
import { Box, Typography, Button } from "@mui/material";
import {
  setPrevTimes,
  setTime,
  deleteTime,
} from "../../store/features/timerSlice";
import { uid } from "uid";
import { ITime } from "../../modules";

const sound = "/sounds/timerSound.mp3";

const Timer = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  let timeList = useSelector(getPrevTimesSelector);
  const time = useSelector(getTimeSelector);

  let { h, m, s } = time;
  const initialTime = useRef(time);
  const [running, setRunning] = useState(false);

  const playSound = (soundUrl: string) => {
    if (!audio) {
      const sound = new Audio(soundUrl);
      sound.loop = true;
      sound.play();
      setAudio(sound);
    }
  };

  const onChangeTime = (newValue: any) => {
    const obj = {
      h: newValue?.$H || 0,
      m: newValue?.$m || 0,
      s: newValue?.$s || 0,
    };
    dispatch(setTime(obj));
    initialTime.current = obj;
  };

  const handleStart = () => {
    setDrawerOpen(true);
    if (h === 0 && m === 0 && s === 0) return;
    setRunning((prevRunning) => !prevRunning);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const interval_id = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (running) {
      interval_id.current = setInterval(() => {
        if (h === 0 && m === 0 && s === 0) {
          setRunning(false);
          setModalOpen(true);
          let { h, m, s }: any = initialTime.current;
          dispatch(setPrevTimes({ h, m, s }));
          clearInterval(interval_id.current);
        }
        if (s > 0) {
          s--;
        }
        if (m > 0 && s === 0) {
          m--;
          s = 59;
        }
        if (h > 0 && m === 0) {
          h--;
          m = 59;
          s = 59;
        }
        dispatch(setTime({ h, m, s, id: uid() }));
      }, 1000);
    } else {
      clearInterval(interval_id.current);
    }
  }, [running]);

  useEffect(() => {
    if (modalOpen) {
      playSound(sound);
    } else {
      audio?.pause();
      setAudio(null);
    }
  }, [modalOpen]);

  const reStartTimer = () => {
    setModalOpen(false);
    setRunning(true);
    dispatch(setTime(initialTime.current));
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const refreshTime = useCallback(
    (time: any) => {
      dispatch(setTime({ h: time.h, m: time.m, s: time.s }));
      setRunning(true);
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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "80px",
          padding: "20px",
          borderRadius: "16px",
          backgroundColor: "#1d1d1d",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
          width: "400px",
          margin: "auto",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            textAlign: "center",
            fontSize: "72px",
            fontWeight: "bold",
            border: "2px solid #4caf50",
            borderRadius: "16px",
            padding: "20px",
            width: "90%",
            backgroundColor: "#212121",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.8)",
          }}
        >
          {formatTime(h)}:{formatTime(m)}:{formatTime(s)}
        </Typography>
        <AddButton handleStart={handleStart} />
      </Box>

      <Typography sx={{ color: "white", marginTop: "20px" }}>
        Son Kullanılanlar
      </Typography>

      {timeList.map((time: any, index: number) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#282c34",
            borderRadius: "8px",
            padding: "10px 20px",
            margin: "10px 0",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
          }}
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
      ))}

      <AlertModal
        open={modalOpen}
        handleClose={handleModalClose}
        reStartTimer={reStartTimer}
      />
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
