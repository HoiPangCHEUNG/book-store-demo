import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Toaster } from "@/app/interface/toast";

interface ToasterState {
  open: boolean;
  title: string;
  msg: string;
}
const initialState: ToasterState = {
  open: false,
  title: "",
  msg: "",
};

export const toaster = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    openToaster: (
      state,
      action: PayloadAction<{ title: string; msg: string }>
    ) => {
      state.open = true;
      state.title = action.payload.title;
      state.msg = action.payload.msg;
    },
    closeToaster: (state) => {
      state = initialState;
    },
  },
});

export const { openToaster, closeToaster } = toaster.actions;
export default toaster.reducer;
