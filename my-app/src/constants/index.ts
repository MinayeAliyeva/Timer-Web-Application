import { IOptions, ITimzeZone } from "./../modules/index";
export const timeZones: ITimzeZone[] = [
  { label: "Abu Dhabi", value: "Asia/Dubai" },
  { label: "Amsterdam", value: "Europe/Amsterdam" },
  { label: "Andorra", value: "Europe/Andorra" },
  { label: "Athens", value: "Europe/Athens" },
  { label: "Auckland", value: "Pacific/Auckland" },
  { label: "Baku", value: "Asia/Baku" },
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
