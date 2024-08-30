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
    <div>
      <h1 style={{color:"white"}}>{timer}</h1>
      <select onChange={handleChangeLangOption} value={option}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.lang}
          </option>
        ))}
      </select>
      <select onChange={handleChanged} value={timer}>
        {state.map((data, i) => (
          <option key={i} value={data.value}>
            {data.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Test;
