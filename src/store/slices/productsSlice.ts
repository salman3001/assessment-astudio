import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@src/types/modals";

export type ProductsState = {
  data: {
    products: Product[];
    skip: number;
    limit: number;
    total: number;
  } | null;
};

const initialState: ProductsState = {
  data: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /**
     * sets the products
     */
    setProducts: (
      state: ProductsState,
      action: PayloadAction<ProductsState["data"]>,
    ) => {
      state.data = action.payload;
    },

    /**
     * Filters the product based on provided string
     * @param state
     * @param action
     */
    searchProducts: (state: ProductsState, action: PayloadAction<string>) => {
      const lowerSearchTerm = action.payload.toLowerCase();
      if (state.data?.products && lowerSearchTerm) {
        state.data.products = state.data?.products.filter((product) =>
          product.title.toLowerCase().includes(lowerSearchTerm),
        );
      }
    },

    filteredProducts: (state: ProductsState, action: PayloadAction<string>) => {
      const lowerSearchTerm = action.payload.toLowerCase();
      if (state.data?.products && lowerSearchTerm) {
        state.data.products = state.data?.products.filter((product) =>
          product.title.toLowerCase().includes(lowerSearchTerm),
        );
      }
    },
  },
});

export const { setProducts, searchProducts } = productsSlice.actions;

export default productsSlice.reducer;
