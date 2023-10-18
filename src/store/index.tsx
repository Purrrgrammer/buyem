import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../RTK/index";
import productReducer from "../slices/product-slice/ProductSlice";
import mockReducer from "../slices/mock-slice/MockSlice";
import accountReducer from "../slices/account-slice/AccountSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    mock: mockReducer,
    account: accountReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(apiSlice.middleware);
  },
});

//SETUP
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
