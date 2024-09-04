import { useEffect, useRef, useState } from "react";
import { DigitalTimer } from "./DigitalTimer";
import { DigitalStartButton } from "./DigitalStartButton";
import { useDispatch } from "react-redux";
import { setIsRunning, setTime } from "../../store/features/timerSlice";
import { useSelector } from "react-redux";
import { getTime, RootState } from "../../store";
import AlertModal from "./DigitalModal";

const Timer = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const time = useSelector(getTime);
  const isRunning = useSelector<RootState>((state) => state.timer.isRunning);
  const sound = "/sounds/timerSound.mp3";

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
  };

  const handleStart = () => {
    dispatch(setIsRunning(true));
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
  };

  const interval_id = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!isRunning) return;
    interval_id.current = setInterval(() => {
      let { h, m, s } = time;
      if (h === 0 && m === 0 && s === 0) {
        clearInterval(interval_id.current);
        playSound(sound);
        setModalOpen(true);
        return;
      }
      if (s > 0) {
        s--;
      } else if (m > 0) {
        m--;
        s = 59;
      } else if (h > 0) {
        h--;
        m = 59;
        s = 59;
      }
      dispatch(setTime({ h, m, s }));
    }, 1000);
    return () => clearInterval(interval_id.current);
  }, [time, isRunning, dispatch]);

  const { h, m, s } = time;
  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <>
      <DigitalTimer onChangeTime={onChangeTime} />
      <DigitalStartButton handleStart={handleStart} />

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

      <AlertModal open={modalOpen} handleClose={handleModalClose} />
    </>
  );
};

export default Timer;
