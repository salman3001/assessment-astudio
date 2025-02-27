import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@src/types/modals";
import { RootState } from "../store";

export type ProductsState = {
  data?: {
    products: Product[];
    skip: number;
    limit: number;
    total: number;
  };
  filters: {
    skip: number;
    limit: number;
    search: string;
    sortBy?: string;
    order?: "asc" | "desc";
  };
  loading: boolean;
  error?: string;
};

const initialState: ProductsState = {
  loading: false,
  filters: {
    skip: 0,
    limit: 5,
    search: "",
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (
      state: ProductsState,
      action: PayloadAction<ProductsState["data"]>,
    ) => {
      state.data = action.payload;
    },
    setProductsFilters: (
      state: ProductsState,
      action: PayloadAction<ProductsState["filters"]>,
    ) => {
      state.filters = action.payload;
    },
    setProductsLoading: (
      state: ProductsState,
      action: PayloadAction<boolean>,
    ) => {
      state.loading = action.payload;
    },
    setProductsError: (
      state: ProductsState,
      action: PayloadAction<string | undefined>,
    ) => {
      state.error = action.payload;
    },
    setProductsSearch: (
      state: ProductsState,
      action: PayloadAction<string>,
    ) => {
      state.filters.search = action.payload;
    },
  },
});

export const {
  setProducts,
  setProductsLoading,
  setProductsError,
  setProductsFilters,
  setProductsSearch,
} = productsSlice.actions;

export default productsSlice.reducer;

export const selectProductTableRows = createSelector(
  [
    (state: RootState) => state?.products?.data,
    (state: RootState) => state?.products?.filters,
  ],
  (productData, filters) => {
    const headers = [
      "sku",
      "Title",
      "Category",
      "Price",
      "rating",
      "stock",
      "brand",
    ];

    const rows =
      productData?.products.map((product) => [
        product.sku,
        product.title,
        product.category,
        product.price,
        product.rating,
        product.stock,
        product.brand,
      ]) || [];

    const lowerSearchTerm = filters.search.toLowerCase();
    if (!lowerSearchTerm || lowerSearchTerm === "") {
      return { headers, rows };
    } else {
      const filteredRows = rows.filter((row) =>
        row.some((val: string | number) =>
          String(val).toLowerCase().includes(lowerSearchTerm),
        ),
      );

      return {
        headers,
        rows: filteredRows,
      };
    }
  },
);
