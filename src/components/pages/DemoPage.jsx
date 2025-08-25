import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../features/counter/counterSlice";


const DemoPage = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="text-center">
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>Click</button>
    </div>
  );
};

export default DemoPage;
