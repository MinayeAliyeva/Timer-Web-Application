import React, { useState } from "react";

const Test = () => {
  const [stoptime, setStoptime] = useState(true);
  let hr = String(0).padStart(2, "0");
  let min = String(0).padStart(2, "0");
  let sec = String(0).padStart(2, "0");

  const handleStart = (e: React.MouseEvent<HTMLElement>) => {
    if (stoptime) {
      setStoptime(false);
      timerCycle();
    }
  };
  const handleStop = (e: React.MouseEvent<HTMLElement>) => {
    if (!stoptime) {
      setStoptime(true);
    }
  };
  const timerCycle = () => {};

  console.log("stoptime", stoptime);

  return (
    <>
      <div style={{ color: "white" }}>{`${hr}:${min}:${sec}`}</div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
};

export default Test;
