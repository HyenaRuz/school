import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectDate: {},
};

export const selectDate = createSlice({
  name: "dateTarger",
  initialState,
  reducers: {
    dayTarget(state, { payload }) {
      state.selectDate = payload;
    },
  },
});

export const { dayTarget } = selectDate.actions;

export default selectDate.reducer;
