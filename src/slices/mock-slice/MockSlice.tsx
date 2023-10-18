import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../model";

const initialState: Product[] = [];

const mockSlice = createSlice({
  name: "mock",
  initialState,
  reducers: {
    setMock: (state, action: PayloadAction<Product[]>) => {
      console.log(action.payload);
      return action.payload; // or === return action.payload
    },
  },
});

export const selectAllMock = (state: any) => state.mock;
export default mockSlice.reducer;
//immer js > use immer > not mutating the state (copy) beside spread
export const { setMock } = mockSlice.actions;
