import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // can mutate because redux toolkit uses immer that makes sure data is not mutated
    addOne(state) {
      state.value++;
    },
    substractOne(state) {
      state.value--;
    },
    addBy(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    setTo(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

// slice obj has : reducer function (to update the data)
// action creator for each function inside the reducers

export const { addOne, substractOne, addBy, setTo } = counterSlice.actions;
export default counterSlice.reducer;

// all the above is a reduce slice
