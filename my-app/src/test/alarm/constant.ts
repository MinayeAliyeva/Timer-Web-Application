// export const timeZones = [
//   "America/New_York",
//   "America/Chicago",
//   "America/Denver",
//   "America/Los_Angeles",
//   "America/Anchorage",
//   "America/Toronto",
//   "America/Vancouver",
//   "America/Edmonton",
//   "America/Winnipeg",
//   "Europe/London",
//   "Europe/Paris",
//   "Europe/Berlin",
//   "Europe/Moscow",
//   "Europe/Istanbul",
//   "Asia/Tokyo",
//   "Asia/Shanghai",
//   "Asia/Kolkata",
//   "Asia/Singapore",
//   "Asia/Dubai",
//   "Asia/Baku",
//   "Australia/Sydney",
//   "Australia/Adelaide",
//   "Australia/Perth",
//   "America/Buenos_Aires",
//   "America/Sao_Paulo",
//   "America/Caracas",
//   "Africa/Cairo",
//   "Africa/Johannesburg",
//   "Africa/Nairobi",
//   "Asia/Beirut",
//   "Asia/Amman",
//   "Asia/Tel_Aviv",
// ];
export interface ITimeZone {
  label: string;
  value: string;
}
export const timeZones: ITimeZone[] = [
  {
    label: "New_York",
    value: "America/New_York",
  },
  {
    label: "Baku",
    value: "Asia/Baku",
  },
];
