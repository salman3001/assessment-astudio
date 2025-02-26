import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/usersSlice";
import productReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
