import React, { useEffect, useState } from "react";
import { ITimeZone, timeZones } from "./constant";
const options = [
  {
    lang: "AZ",
    value: "az-AZ",
  },
  {
    lang: "EN",
    value: "en-EN",
  },
];
const AlarmTest = () => {
  const [state, setState] = useState<ITimeZone[]>([]);
  const [timer, setTimer] = useState("");
  const [option, setOption] = useState("az-AZ");
  console.log("render");

  useEffect(() => {
    const timeFormaterList: ITimeZone[] = [];
    timeZones?.forEach((zone) => {
      const formatter = new Intl.DateTimeFormat(option, {
        timeZone: zone?.value,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      timeFormaterList.push({
        label: zone.label,
        value: formatter.format(new Date()),
      });
    });
    if (timeFormaterList?.length) {
      setState(timeFormaterList);
    }
  }, [option]);

  const handleChangeLangOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOption(event.target.value);
  };
  const handleChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimer(event.target.value);
  };

  return (
    <div>
      <h1>{timer}</h1>
      <select onChange={handleChangeLangOption}>
        {options?.map((option) => {
          return (
            <option key={option?.value} value={option.value}>
              {option.lang}
            </option>
          );
        })}
      </select>
      <select onChange={handleChanged}>
        {state?.map((data, i) => {
          return (
            <option key={i} value={data.value}>
              {data.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default AlarmTest;
