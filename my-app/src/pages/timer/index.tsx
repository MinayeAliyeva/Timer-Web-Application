import { useEffect, useRef, useState } from "react";
import { DigitalTimer } from "./DigitalTimer";
import { XButton } from "../../shared/components/XButton";
import { useDispatch } from "react-redux";
import { setTime } from "../../store/features/timerSlice";
import { useSelector } from "react-redux";
import { getTimeSelector } from "../../store";
import AlertModal from "./DigitalModal";
import XTimerDrawer from "../../shared/components/XTimerDrawer";
import PlusIcon from "../../shared/icons/PlusIcon";
import AddButton from "./AddButton";
import { Box } from "@mui/material";
const sound = "/sounds/timerSound.mp3";

const Timer = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
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
          clearInterval(interval_id.current);
          setRunning(false);
          setModalOpen(true);
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

        dispatch(setTime({ h, m, s }));
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

      console.log("modal", modalOpen);
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

  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h1
          style={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "50px",
          }}
        >
          {formatTime(h)}:{formatTime(m)}:{formatTime(s)}
        </h1>
        <AddButton handleStart={handleStart} />
      </Box>
      <AlertModal
        open={modalOpen}
        handleClose={handleModalClose}
        reStartTimer={reStartTimer}
      />
      <XTimerDrawer
        handleStart={handleStart}
        onChangeTime={onChangeTime}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
};

export default Timer;
