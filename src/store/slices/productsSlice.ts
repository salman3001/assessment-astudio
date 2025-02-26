import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@src/types/modals";

export type ProductsState = Product[] | null;

const initialState: ProductsState = null;

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state: ProductsState, action: PayloadAction<Product[]>) => {
      state = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
