import { RouteObject } from "react-router-dom";

export type MyRouterObject = RouteObject;
export interface IOptions {
  timeZone: string;
  hour: "2-digit" | "numeric" | undefined;
  minute: "2-digit" | "numeric" | undefined;
  second: "2-digit" | "numeric" | undefined;
  hour12: boolean;
}
export type TTimeList = {
  city: string;
  time: string;
  id:number
};
export interface ITimzeZone {
  label: string;
  value: string;
  id: number;
}
export interface ITimeHistory {
  ms: number;
  min: number;
  sec: number;
  step?: number;
}
