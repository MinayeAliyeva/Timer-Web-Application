import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { setTest } from "../store/features/testSlice";

const Test = () => {
  const test = useSelector<RootState>((state) => state.test.test) as any;
  const dispatch = useDispatch();
  useEffect(() => {
    setInterval(() => {
      console.log("I am running");
      dispatch(setTest("b"));
    }, 1000);
  }, []);
  console.log("test", test);

  //   useEffect(() => {});
  return (
    <div style={{backgroundColor:'red'}}>
        hhellooo
      {test?.map((el: any, i: any) => (
        <h1 key={i}>{el}</h1>
      ))}
    </div>
  );
};

export default Test;
