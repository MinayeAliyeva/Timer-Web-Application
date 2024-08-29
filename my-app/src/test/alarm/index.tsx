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

  useEffect(() => {
    const updateTimes = () => {
      const timeFormaterList: ITimeZone[] = timeZones.map((zone) => {
        const formatter = new Intl.DateTimeFormat(option, {
          timeZone: zone?.value,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return {
          label: zone.label,
          value: formatter.format(new Date()),
        };
      });
      setState(timeFormaterList);
    };

    updateTimes(); // İlk yüklemede zamanları ayarla
    const intervalId = setInterval(updateTimes, 1000); // Her saniye güncellenmesini sağla

    return () => clearInterval(intervalId); // Bileşen unmount olduğunda interval'ı temizle
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

export default AlarmTest;
