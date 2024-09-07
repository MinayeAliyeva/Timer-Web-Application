export interface ITimeHistory {
  ms: number;
  min: number;
  sec: number;
  step: number;
  createdDate: string;
  round: number;
}
//state props types =ITimeHistoryState IProps
export type TypeTime = Pick<ITimeHistory, "ms" | "min" | "sec">;
export type TypeTimeHistory = Partial<ITimeHistory>;


