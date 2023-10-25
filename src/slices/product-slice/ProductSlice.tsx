import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../url";
import { Product } from "../../model";

interface inistate {
  products: Product[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: any;
}
const initialState: inistate = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts: any = createAsyncThunk(
  //string first argument is the pre fix for the action type, 2nd payload creator callback
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    success: (state, action) => {
      state.products = action.payload;
    },
  },
  //builder callback api
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state: inistate, action: any) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const selectAllProducts = (state: { products: inistate }) =>
  state.products.products;
export const getProductsStatus = (state: { products: inistate }) =>
  state.products.status;
export const getProductsError = (state: { products: inistate }) =>
  state.products.error;
export const { success } = productsSlice.actions;
export default productsSlice.reducer;
//immer js > use immer > not mutating the state (copy) beside spread
