import React, { useEffect, useRef, useState } from "react";

const TestRef = () => {
  const [check, setCheck] = useState(false);

  //   const ref = useRef<any>({ usname: "", sname: "" });
  const nameref = useRef<any>("");
  const snameref = useRef<any>("");
  const onRequest = () => {
    setCheck(!check);
    //do it asinxron==>>>>
    // console.log(nameref.current.value);
    // console.log(snameref.current.value);
  };
  //===>>>
  useEffect(() => {
    console.log(nameref.current.value);
    console.log(snameref.current.value);
  }, [check]);

  return (
    <div style={{ color: "#fff" }}>
      username: <input ref={nameref} type="text" />
      <br />
      surname:
      <input ref={snameref} type="text" />
      <br />
      <button onClick={onRequest}>REQUEST</button>
    </div>
  );
};

export default TestRef;
