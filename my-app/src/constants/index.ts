import { IOptions } from "./../modules/index";
export const timeZones = [
  { city: "New_York", value: "America/New_York" },
  { city: "London", value: "Europe/London" },
  { city: "Baku", value: "Asia/Baku" },
];
export const getCurrentTime = (timeZone: string) => {
  const options: IOptions = {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return new Intl.DateTimeFormat("tr-TR", options).format(new Date());
};
