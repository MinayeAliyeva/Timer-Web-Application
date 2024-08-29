import React, { useState, useEffect } from "react";

const Test = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const hours = currentDate?.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const sec = currentDate.getSeconds().toString().padStart(2, "0");

  return (
    <>
      <h1>Baku:</h1>
      <div>
        {hours}:{minutes}:{sec}
      </div>
    </>
  );
};

export default Test;
