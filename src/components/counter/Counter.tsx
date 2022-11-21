import React from "react";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addOne,
  substractOne,
  addBy,
  setTo,
} from "../../features/counter/counter-slice";

function Counter() {
  const counterValue = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const handlePlus1 = () => dispatch(addOne());
  const handleMinus1 = () => dispatch(substractOne());
  const handlePlus2 = () => dispatch(addBy(2));
  const handlePlus4 = () => dispatch(addBy(4));
  const handleReset = () => dispatch(setTo(0));

  return (
    <>
      <p>
        Counter <span className="explanation">(component)</span>
      </p>
      <p>The counter value is {counterValue}.</p>

      <Stack direction="row" spacing={1} alignItems="center">
        <span>Edit counter value:</span>
        <Button variant="contained" onClick={handlePlus1}>
          + 1
        </Button>
        <Button variant="contained" onClick={handleMinus1}>
          - 1
        </Button>
        <Button variant="contained" onClick={handlePlus2}>
          + 2
        </Button>
        <Button variant="contained" onClick={handlePlus4}>
          + 4
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset to zero
        </Button>
      </Stack>
    </>
  );
}

export default Counter;
