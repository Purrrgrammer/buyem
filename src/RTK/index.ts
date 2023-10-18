//slice for RTK
import { BASE_URL } from "../url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchproducts: builder.query<Product[], number | void>({
        query(limit = 10) {
          return `/products?=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchproductsQuery } = apiSlice;

//where we keep the data in the  //how
