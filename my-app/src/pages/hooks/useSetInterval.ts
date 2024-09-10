import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrevTimesSelector, getTimeSelector, RootState } from "../../store";
import {
  setIsRunning,
  setPrevTimesByHistory,
  setShowTimeHistory,
  setTime,
} from "../../store/features/timerSlice";

export const useSetInterval = () => {
  const interval_id = useRef<NodeJS.Timeout | null>(null);
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);
  const time = useSelector(getTimeSelector);
  let timeList = useSelector(getPrevTimesSelector);

  const dispatch = useDispatch();
  
  let { h, m, s } = time;

  useEffect(() => {
    if (isRunning) {
      interval_id.current = setInterval(() => {
        if (h === 0 && m === 0 && s === 0) {
          dispatch(setIsRunning(false));
          clearInterval(interval_id.current!);
          dispatch(setShowTimeHistory(true));
          dispatch(setPrevTimesByHistory(timeList.map((item)=>({...item,showHistory: true}))))
          return;
        }
        if (s > 0) {
          s--;
        } else if (m > 0 && s === 0) {
          m--;
          s = 59;
        } else if (h > 0 && m === 0) {
          h--;
          m = 59;
          s = 59;
        }

        dispatch(setTime({ h, m, s, currentTime: true }));
      }, 1000);
    } else {
      clearInterval(interval_id?.current as any);
    }
  }, [isRunning]);
};
