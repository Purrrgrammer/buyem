import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../model";

const initialState: Product[] = [];

const mockSlice = createSlice({
  name: "mock",
  initialState,
  reducers: {
    setMock: (_, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
});

export const selectAllMock = (state: any) => state.mock;
export default mockSlice.reducer;
//immer js > use immer > not mutating the state (copy) beside spread
export const { setMock } = mockSlice.actions;
