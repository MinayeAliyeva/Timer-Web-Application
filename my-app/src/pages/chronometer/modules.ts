export interface ITimeHistory {
  ms: number;
  min: number;
  sec: number;
  step: number;
  createdDate: string ;
  round:number
}
//state props types =ITimeHistoryState IProps
export type  TypeTime =  Pick<ITimeHistory, "ms" | "min" | "sec">
export type TypeTimeHistory= Partial<ITimeHistory>;



// export interface IHistory {
//   time: Pick<ITimeHistory, "hr" | "min" | "sec">;
//   /*
//   type Ihistory ={
//   hr: number;
//   min: number;
//   sec: number;
//   }
//    */
//   timeHistory: Partial<ITimeHistory>;
//   /*type thistory= {
//   hr?: number;
//   min?: number;
//   sec?: number;
//   step?: number;
//   createdDate?: string | Date;
//   }   */
//   /*
//   time :Omit<IHistory,"step"|"createDate"> //silir 
//   */
// }