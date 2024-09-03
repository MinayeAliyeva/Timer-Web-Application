import { IOptions, ITimzeZone } from "../../../modules";

export const timeZones: ITimzeZone[] = [
  { id: 1, label: "Abu Dhabi", value: "Asia/Dubai" },
  { id: 2, label: "Amsterdam", value: "Europe/Amsterdam" },
  { id: 3, label: "Andorra", value: "Europe/Andorra" },
  { id: 4, label: "Athens", value: "Europe/Athens" },
  { id: 5, label: "Auckland", value: "Pacific/Auckland" },
  { id: 6, label: "Baku", value: "Asia/Baku" },
  { id: 7, label: "Bangkok", value: "Asia/Bangkok" },
  { id: 8, label: "Beijing", value: "Asia/Shanghai" },
  { id: 9, label: "Buenos Aires", value: "America/Argentina/Buenos_Aires" },
  { id: 10, label: "Cape Town", value: "Africa/Johannesburg" },
  { id: 11, label: "Dubai", value: "Asia/Dubai" },
  { id: 12, label: "Helsinki", value: "Europe/Helsinki" },
  { id: 13, label: "Hong Kong", value: "Asia/Hong_Kong" },
  { id: 14, label: "Istanbul", value: "Europe/Istanbul" },
  { id: 15, label: "Kabul", value: "Asia/Kabul" },
  { id: 16, label: "Los Angeles", value: "America/Los_Angeles" },
  { id: 17, label: "Mexico City", value: "America/Mexico_City" },
  { id: 18, label: "Moscow", value: "Europe/Moscow" },
  { id: 19, label: "Nairobi", value: "Africa/Nairobi" },
  { id: 20, label: "New Delhi", value: "Asia/Kolkata" },
  { id: 21, label: "Osaka", value: "Asia/Tokyo" },
  { id: 22, label: "Paris", value: "Europe/Paris" },
  { id: 23, label: "Rio de Janeiro", value: "America/Sao_Paulo" },
  { id: 24, label: "Rome", value: "Europe/Rome" },
  { id: 25, label: "San Francisco", value: "America/Los_Angeles" },
  { id: 26, label: "Sydney", value: "Australia/Sydney" },
  { id: 27, label: "Tokyo", value: "Asia/Tokyo" },
  { id: 28, label: "Toronto", value: "America/Toronto" },
  { id: 29, label: "Vancouver", value: "America/Vancouver" },
  { id: 30, label: "Wellington", value: "Pacific/Wellington" },
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
