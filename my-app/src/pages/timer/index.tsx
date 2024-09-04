import React, { useEffect, useState } from "react";
import { DigitalTimer } from "./DigitalTimer";
import DigitalTimerDrawer from "./DigitalTimerDrawer";
import { DigitalStartButton } from "./DigitalStartButton";

const Timer = () => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const onChangeTime = (newValue: any) => {
    const obj = {
      h: newValue?.$H || 0,
      m: newValue?.$m || 0,
      s: newValue?.$s || 0,
    };
    setTime(obj);
  };
  const handleStart = () => {
    setIsRunning(true);
  };
  console.log("time", time);

  useEffect(() => {
    if (!isRunning) return;
    const countdown = setInterval(() => {
      let { h, m, s } = time;
      if (h === 0 && m === 0 && s === 0) {
        clearInterval(countdown);
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
      setTime({ h, m, s });
    }, 1000);
    return () => clearInterval(countdown);
  }, [time, isRunning]);
  const { h, m, s } = time;
  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);
  return (
    <>
      <DigitalTimer onChangeTime={onChangeTime} />
      <DigitalStartButton handleStart={handleStart} />

      <h1 style={{ color: "#fff" }}>
        {formatTime(h)}:{formatTime(m)}:{formatTime(s)}
      </h1>
      {/* <DigitalTimerDrawer/> */}
      {/* <button onClick={handleStart}>Basla</button> */}
    </>
  );
};

export default Timer;
